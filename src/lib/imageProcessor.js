/**
 * Processes an image file: reads it, crops it to 16:9 aspect ratio (center crop),
 * resizes it to 800x450, and returns a Base64 string.
 * 
 * @param {File} file - The image file to process.
 * @returns {Promise<string>} - A promise that resolves to the Base64 string of the processed image.
 */
export const processImage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No file provided');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Target dimensions (16:9)
                const TARGET_WIDTH = 800;
                const TARGET_HEIGHT = 450;
                const TARGET_ASPECT = TARGET_WIDTH / TARGET_HEIGHT;

                canvas.width = TARGET_WIDTH;
                canvas.height = TARGET_HEIGHT;

                // Calculate crop
                let sourceWidth = img.width;
                let sourceHeight = img.height;
                let sourceAspectRatio = sourceWidth / sourceHeight;
                let drawWidth, drawHeight, offsetX, offsetY;

                if (sourceAspectRatio > TARGET_ASPECT) {
                    // Source is wider than target: Crop width
                    drawHeight = sourceHeight;
                    drawWidth = sourceHeight * TARGET_ASPECT;
                    offsetX = (sourceWidth - drawWidth) / 2;
                    offsetY = 0;
                } else {
                    // Source is taller than target: Crop height
                    drawWidth = sourceWidth;
                    drawHeight = sourceWidth / TARGET_ASPECT;
                    offsetX = 0;
                    offsetY = (sourceHeight - drawHeight) / 2;
                }

                // Draw to canvas
                ctx.drawImage(
                    img,
                    offsetX, offsetY, drawWidth, drawHeight, // Source rect
                    0, 0, TARGET_WIDTH, TARGET_HEIGHT        // Dest rect
                );

                // Export as JPEG with 0.7 quality/compression
                const base64 = canvas.toDataURL('image/jpeg', 0.7);
                resolve(base64);
            };

            img.onerror = (error) => reject(error);
        };

        reader.onerror = (error) => reject(error);
    });
};
