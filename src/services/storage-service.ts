import { prisma } from "../prisma";

export class StorageService {
    public static async findImage(id: string): Promise<Buffer> {
        const image = await prisma.storage.findUnique({
            where: { id }
        });

        //TODO: adicionar erro 404
        return image?.image || Buffer.alloc(0);
    }

    public static async createImage(image: Buffer): Promise<string> {
        const { id } = await prisma.storage.create({
            data: { image }
        });

        return id;
    }
}
