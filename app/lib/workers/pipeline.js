import { pipeline } from "@xenova/transformers";

class PipelineSingleton {
  static instance;

  static async init(...args) {
    this.instance = await pipeline(...args);
  }
}

// Listen for messages from the main thread
self.addEventListener("message", async (event) => {
  const { type, args } = event.data;

  switch (type) {
    case "init": {
      const progress_callback = (data) => {
        self.postMessage({
          type: "progress",
          data,
        });
      };

      const [task, model, options] = args;

      await PipelineSingleton.init(task, model, {
        ...options,
        progress_callback,
      });

      self.postMessage({
        type: "ready",
      });

      break;
    }
    case "run": {
      if (!PipelineSingleton.instance) {
        throw new Error("Pipeline not initialized");
      }

      const { id } = event.data;

      const output = await PipelineSingleton.instance(...args);

      // Classes (i.e., `Tensor`) cannot be transferred to the main thread,
      // so we spread its properties into a plain object
      const data = { ...output };

      self.postMessage({
        type: "result",
        id,
        data,
      });

      break;
    }
  }
});
