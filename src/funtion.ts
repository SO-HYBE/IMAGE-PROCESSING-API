import sharp from 'sharp';

async function imgFunc(
    width: number,
    height: number,
    input: string,
    output: string
) {
    try {
        sharp(input)
            .resize(width as unknown as number, height as unknown as number)
            .toFile(output, function (info) {
                console.log(info);
            });
        return;
    } catch {
        return "Image can't be processed.";
    }
}

export default imgFunc;
