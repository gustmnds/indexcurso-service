import { server } from "./server";
import { Configs } from "./configs";
import { AddressInfo } from "net";
import { prisma } from "./prisma";

async function main() {
    await prisma.$connect();
    const httpServer = server.listen(Configs.PORT, () => {
        const address = httpServer.address() as AddressInfo;
        console.log("listen on port:", address.port);
    });
}

main();
