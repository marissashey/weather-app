import { Client } from "@gradio/client";
import { useEffect, useState } from "react";

export default function Model() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const generateImage = async () => {
      const client = await Client.connect(
        "stabilityai/stable-diffusion-3-medium"
      );

      const result = await client.predict("/infer", {
        prompt:
          "studio ghibli anime style image of a kid dressed for a sunny day",
        negative_prompt: "",
        seed: 562713934,
        randomize_seed: true,
        width: 1024,
        height: 1024,
        guidance_scale: 5,
        num_inference_steps: 28,
      });
      console.log(result.data);
      setImageUrl(result?.data[0]); // dep on result struct
    };

    generateImage();
  }, []);

  return (
    <>
      <div>
        {imageUrl ? (
          <img src={imageUrl} alt='generated ai image' />
        ) : (
          "generating image..."
        )}
      </div>
    </>
  );
}
