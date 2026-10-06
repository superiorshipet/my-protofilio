import { spawn } from "child_process";
import fs from "fs";

async function verify() {
  console.log("Launching headless browser for verification...");
  const brave = spawn("brave-browser", [
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    "--remote-debugging-port=9225",
    "--window-size=1280,900",
    "http://localhost:5173",
  ]);

  await new Promise((r) => setTimeout(r, 2200));

  try {
    const listRes = await fetch("http://127.0.0.1:9225/json");
    const pages = await listRes.json();
    const page = pages.find((p) => p.type === "page" && p.url.includes("5173"));
    if (!page) {
      throw new Error("Page not found on port 9225");
    }

    const ws = new WebSocket(page.webSocketDebuggerUrl);
    let id = 1;
    const send = (method, params = {}) =>
      new Promise((resolve) => {
        const curId = id++;
        const handler = (evt) => {
          const data = JSON.parse(evt.data);
          if (data.id === curId) {
            ws.removeEventListener("message", handler);
            resolve(data.result);
          }
        };
        ws.addEventListener("message", handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });

    await new Promise((r) => ws.addEventListener("open", r));
    console.log("Connected to page WebSocket!");

    // Wait 2.5s for initial render and globe canvas mounting
    await new Promise((r) => setTimeout(r, 2500));

    // Scroll to the globe section in About Bento
    await send("Runtime.evaluate", {
      expression: `document.getElementById('about')?.scrollIntoView({ behavior: 'instant', block: 'center' });`,
    });
    await new Promise((r) => setTimeout(r, 2000));

    // Capture Globe with miniature avatars and directional callouts
    const ssGlobe = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(
      "/home/superior/.gemini/antigravity/brain/f97693bf-5e64-4f3b-9f04-5267e66ed469/scratch/verify_globe_avatars_and_callouts.png",
      Buffer.from(ssGlobe.data, "base64")
    );
    console.log("Saved verify_globe_avatars_and_callouts.png");

    // Perform smooth horizontal drag to rotate Middle East into front
    const canvasBox = await send("Runtime.evaluate", {
      expression: `(() => {
        const c = document.getElementById('about')?.querySelector('canvas');
        if (c) {
          const r = c.getBoundingClientRect();
          return JSON.stringify({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
        }
        return null;
      })()`,
      returnByValue: true,
    });

    const boxVal = canvasBox?.result?.value;
    if (boxVal) {
      const { x, y } = JSON.parse(boxVal);
      console.log(`Dragging globe at center (${x}, ${y})...`);

      await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
      // Drag smoothly to the left (negative deltaX rotates globe eastward to show Saudi Arabia and Egypt)
      for (let offset = 1; offset <= 12; offset++) {
        await send("Input.dispatchMouseEvent", {
          type: "mouseMoved",
          x: x - offset * 15,
          y: y,
          button: "left",
        });
        await new Promise((r) => setTimeout(r, 20));
      }
      await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: x - 180, y: y, button: "left", clickCount: 1 });
      console.log("Released pointer - momentum gliding active!");
      await new Promise((r) => setTimeout(r, 800));

      // Second smooth drag to bring Middle East (Egypt & Saudi Arabia) into full view
      await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
      for (let offset = 1; offset <= 18; offset++) {
        await send("Input.dispatchMouseEvent", {
          type: "mouseMoved",
          x: x - offset * 15,
          y: y,
          button: "left",
        });
        await new Promise((r) => setTimeout(r, 15));
      }
      await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: x - 270, y: y, button: "left", clickCount: 1 });
      await new Promise((r) => setTimeout(r, 1200));

      const ssSaudi = await send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(
        "/home/superior/.gemini/antigravity/brain/f97693bf-5e64-4f3b-9f04-5267e66ed469/scratch/verify_globe_saudi_visible.png",
        Buffer.from(ssSaudi.data, "base64")
      );
      console.log("Saved verify_globe_saudi_visible.png");
    }

    // Scroll down to Footer
    await send("Runtime.evaluate", {
      expression: `
        window.scrollTo(0, document.body.scrollHeight);
      `,
    });
    await new Promise((r) => setTimeout(r, 1000));

    // Verify footer divider absence
    const footerAnalysis = await send("Runtime.evaluate", {
      expression: `
        const footer = document.querySelector('footer');
        const hasBorderTop = footer ? window.getComputedStyle(footer).borderTopWidth : null;
        const innerBorder = footer ? footer.querySelector('.border-t') : null;
        JSON.stringify({ hasBorderTop, innerBorderFound: !!innerBorder });
      `,
      returnByValue: true,
    });
    console.log("Footer check:", footerAnalysis.value);

    const ssFooter = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(
      "/home/superior/.gemini/antigravity/brain/f97693bf-5e64-4f3b-9f04-5267e66ed469/scratch/verify_footer_no_divider.png",
      Buffer.from(ssFooter.data, "base64")
    );
    console.log("Saved verify_footer_no_divider.png");

    console.log("Verification finished successfully!");
  } finally {
    brave.kill();
  }
}

verify().catch((e) => {
  console.error("Verification failed:", e);
  process.exit(1);
});
