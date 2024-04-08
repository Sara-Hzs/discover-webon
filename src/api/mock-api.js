// mock-api.js
const mockWebons = [
    {
        "name": "Dev WebOn",
        "description": "For developers, DemoWebon is an invaluable resource. It's designed to provide a dedicated environment for developing Nomo WebOns and comes complete with tutorials, readily available on dev.nomo.app. This WebOn serves as an interactive showcase of various features that can be integrated into your custom WebOns. This includes capabilities like signing transactions through provided npm packages, interacting with the chat, sending assets, scanning QR codes, and adding custom tokens.",
        "slogan": "For Developers, By Developers",
        "images": [],
        "icon": "/assets/icons/demo_plugin.svg",
        "card_image": "/assets/cards/demo_plugin.png",
        "version": "0.1.0",
        "id": "demo",
        "download_link": "https://nomo.app/webon/demowebon.nomo.zone"
    },


    {
        "name": "Faucet",
        "description": "As a gesture of appreciation, our users receive 0.1 Zeniq Tokens for free – a gift from Nomo. These tokens can be claimed once per wallet and are particularly useful for covering gas fees associated with transactions on Zeniq Smartchain. Whether you're transferring Zeniq Smartchain Tokens or engaging in our Smartchain, these tokens come in handy for a smooth and cost-effective experience.",
        "slogan": "Boost Your Smartchain Transactions with FAUCET",
        "images": [],
        "icon": "/assets/icons/faucet.svg",
        "card_image": "/assets/cards/faucet.svg",
        "version": "0.1.0",
        "id": "faucet",
        "download_link": "https://nomo.app/webon/faucet.nomo.zone"
    },
    {
        "name": "Token Generator",
        "description": "The Token Generator WebOn opens up exciting possibilities. It allows you to craft custom tokens on Zeniq Smartchain in a matter of seconds. It's as easy as inputting your token details, hitting the generate button, and seamlessly adding your newly created tokens to your NOMO wallet. Just ensure you have some Zeniq tokens available to cover minimal fees. You can obtain Zeniq tokens from our Faucet, making the token generation process a breeze.",
        "slogan": "Smartchain Tokens Crafted Your Way",
        "images": [],
        "icon": "/assets/icons/token_generator.svg",
        "card_image": "/assets/cards/token_generator.svg",
        "version": "0.1.0",
        "id": "tokens",
        "download_link": "https://nomo.app/webon/tokengenerator.nomo.zone"
    },
    {
        "name": "Avinoc Incentive",
        "description": "Where Success Meets Rewards. Unlock the Power of Every Code to Transform Incentives into Earnings, One Code at a Time. Unlock Your Rewards: Redeem Your Code for Avinoc ZEN20 Tokens in the WebOn. Don't Miss Out on Your Exclusive Incentive!",
        "slogan": "Where Codes Become Tokens.",
        "images": [
        ],
        "icon": "/assets/icons/avinoc_Incentive.svg",
        "card_image": "/assets/cards/avinoc_Incentive.svg",
        "version": "0.1.0",
        "id": "avinoc",
        "download_link": "https://nomo.app/webon/incentive.avinoc.com"
    },
    {
        "name": "ZENCON DEBIT",
        "description": "Embrace a new era of financial serenity with the ZENCON debit card. It's not just a card; it's your key to effortless and secure transactions in a fast-paced world. Say goodbye to chaos and hello to peace of mind as you navigate the financial landscape with confidence.",
        "slogan": "Where Serenity Meets Spending Power.",
        "images": [
        ],
        "icon": "/assets/icons/zencon.svg",
        "card_image": "/assets/cards/zencon.png",
        "version": "0.1.0",
        "id": "zencon",
        "download_link": "https://nomo.app/webon/debit.zencon.cards"
    },
    {
        "name": "ZENPASS",
        "description": "Elevate your identity with ZENPASS on the ZENIQ Smartchain, enabling robust authentication for physical applications. Our KYC identification system (know your customer) streamlines the authentication process and ensures the security of your personal data. With your ZENPASS NFT, securely share your KYC-approved personal information across multiple applications. Take charge of your data, unlock new opportunities, and keep your information protected.",
        "slogan": "Empower Your Identity, Enhance Your Security",
        "images": [
        ],
        "icon": "/assets/icons/zenpass.svg",
        "card_image":"/assets/cards/zenpass.svg",
        "version": "0.1.0",
        "id": "zenpass",
        "download_link": "https://nomo.app/webon/zenpass.cc"
    },
    {
        "name": "Swap WebOn",
        "description": "Unlock the Power of Digital Finance with Swap. Seamlessly convert tokens and embrace a user-friendly tool for the future of finance. It simplifies exchanges and optimises your digital assets for financial growth. Ideal for traders or newcomers. The Swap offers efficiency and user-friendliness. Elevate your digital finance with this powerful tool.",
        "slogan": "Simplify Asset Exchange with Swap",
        "images": [
        ],
        "icon": "/assets/icons/swap.svg",
        "card_image": "/assets/cards/swap.svg",
        "version": "0.1.0",
        "id": "swap",
        "download_link": "https://nomo.app/webon/swap.nomo.zone"
    },

    {
        "name": "Avinoc Migration",
        "description": "Swap your ERC20 AVINOC Tokens to ZEN20 Tokens on the ZENIQ Smartchain effortlessly with our AVINOC Migration WebOn. Enjoy hassle-free swaps, enhanced security, and lightning-fast transfers, all while unlocking new possibilities for your AVINOC holdings. Download AVINOC Migration WebOn today and embrace the future of AVINOC token swapping with confidence and ease!",
        "slogan": "Unlock the Future with Easy Asset Exchange",
        "images": [
        ],
        "icon": "/assets/icons/avinoc_migration.svg",
        "card_image": "/assets/cards/avinoc_migration.svg",
        "version": "0.1.0",
        "id": "avinocMigration",
        "download_link": "https://nomo.app/webon/swap.avinoc.com"
    },

    {
        "name": "NEO Credit DeFi",
        "description": "Unleash Your Earning Power: Step into the world of Neo Credit DeFi minting and unlock a new level of yield potential. Seamlessly stake your NEO Credit tokens and amplify your returns without limits, opening up lucrative opportunities for growth and success in the blockchain ecosystem.",
        "slogan": "Amplify Your Yield Potential with NEO Credit! ",
        "images": [
        ],
        "icon": "/assets/icons/NEO_credit_DeFi.svg",
        "card_image": "/assets/cards/NEO_credit_DeFi.svg",
        "version": "0.1.0",
        "id": "neoCreditDeFi",
        "download_link": "https://nomo.app/webon/nrt.st"
    },
    {
        "name": "NEO Credit Migration",
        "description": "Elevate Your User Experience: Embark on a seamless transition by migrating your NRT to the ZENIQ Smartchain, unlocking a myriad of powerful features that promise to elevate your transactions and rewards within our dynamic ecosystem. This upgrade not only ensures a smoother and more efficient process but also opens the door to enhanced functionalities designed to enrich your overall interaction with our platform. Join us on this transformative journey, and experience the next level of convenience and rewards as you embrace the innovative possibilities of the ZENIQ Smartchain. Upgrade now to discover a world of possibilities that await you in our enhanced ecosystem!",
        "slogan": "Move Your NEO Credit (NRT)  from the Binance Chain to the ZENIQ Smartchain! Elevate Your Blockchain Journey! ",
        "images": [
        ],
        "icon": "/assets/icons/NEO_credit_migration.svg",
        "card_image": "/assets/cards/NEO_credit_migration.svg",
        "version": "0.1.0",
        "id": "neoCreditMigration",
        "download_link": "https://nomo.app/webon/nrt.cx"
    },


    {
        "name": "Avinoc DeFi",
        "description": "Unlock Your Earning Potential: Step into the world of Avinoc DeFi and unleash a heightened level of yield potential. Seamlessly participate with your Avinoc DeFi tokens to enhance your returns without constraints, exploring rewarding opportunities for growth and success within the blockchain ecosystem.",
        "slogan": "Maximize Your Yield Potential with Avinoc DeFi!",
        "images": [
        ],
        "icon": "/assets/icons/avinoc_DeFi.svg",
        "card_image": "/assets/cards/avinoc_DeFi.svg",
        "version": "0.1.0",
        "id": "avinocDeFi",
        "download_link": "https://nomo.app/webon/defi.avinoc.com"
    },
    {
        "name": "Supersonic",
        "description": "Supersonic is a special program that connects the two worlds of AVINOC and VOO in a unique way. It is designed to support the price development of AVINOC and VOO token.\nTo participate in the Supersonic program, you need at least one or more VOO Minting hub and AVINOC token equivalent to the value of your hub. You can use any hubs you already own or simply purchase new VOO hubs. The highlight of the program is the 4 Supersonic Days. On your first Supersonic Day, the number of your AVINOC token is multiplied by a certain coefficient. If you participate in subsequent Supersonic Days, the already multiplied AVINOC token are again multiplied by a certain factor.",
        "slogan": "Start with Supersonic",
        "images": [],
        "icon": "/assets/icons/supersonic.svg",
        "card_image": "/assets/cards/supersonic.svg",
        "version": "0.1.0",
        "id": "supersonic",
        "download_link": "https://nomo.app/webon/supersonic.avinoc.com"
    },
    {
        "name": "Voo Miles",
        "description": "Start building your VOO Crew to enjoy the benefits of VOO Miles with your very first booking on the ultimate flight booking app, VOO Travel, upon its launch. Join us in experiencing the exclusive perks and bonuses that come with being a part of VOO Miles. Don’t miss out on the excitement – sign up today for an unparalleled travel experience! #VOOMiles #VOOTravel",
        "slogan": "Start building your Crew now!",
        "images": [],
        "icon": "/assets/icons/voo.svg",
        "card_image": "/assets/cards/voo.svg",
        "version": "0.1.0",
        "id": "klndbgduvadvf",
        "download_link": "https://nomo.app/webon/voo.nomo.app"
    },
    {
        "name": "EURK Voucher",
        "description": "Discover a new era of financial flexibility with KMall's innovative Eurocoin migration to vouchers! Seamlessly convert your Eurocoins into versatile vouchers, unlocking a world of possibilities within our digital ecosystem. Elevate your experience, simplify transactions, and embrace the future of convenience. ",
        "slogan": "Eurocoin Migration to Vouchers within KMall's Digital Realm!",
        "images": [],
        "icon": "/assets/icons/eurk.svg",
        "card_image": "/assets//cards/eurk.svg",
        "version": "0.1.0",
        "id": "eurkVoucher",
        "download_link": "https://nomo.app/webon/eurk.top"
    },
    {
        "name": "ZUSD Swap",
        "description": "Embark on a journey of financial fluidity with the ZUSD Swap WebOn. Seamlessly convert USDT (Ethereum) and USDC (Ethereum) into ZUSD tokens on the Zeniq Smartchain. Soon, expand your reach by shifting USDT and USDC from BSC. The ZUSD Swap WebOn is your key to unlocking diverse crypto landscapes, ensuring swift transactions and dynamic token management. Empower your crypto journey with agility and versatility.",
        "slogan": "Transform Your Tokens, Ignite Potential",
        "images": [],
        "icon": "/assets/icons/zusd.svg",
        "card_image": "/assets/cards/zusd.svg",
        "version": "0.1.0",
        "id": "zusd",
        "download_link": "https://nomo.app/webon/zusd.cc"
    },
    {
        "name": "XGI Migration",
        "description": "Seamlessly convert your SGI (Safir Global International) Tokens to XGI (Xera Global International) Tokens on the dedicated platform with our XGI Migration WebOn. Experience smooth token swaps, top-notch security, and swift transactions, all while exploring new opportunities for your SGI holdings. Download XGI Migration WebOn now and step into the future of SGI token swapping with confidence and simplicity!",
        "slogan": "Transform Your Assets with Effortless Exchange",
        "images": [],
        "icon": "/assets/icons/XGI_migration.svg",
        "card_image": "/assets/cards/XGI_migration.svg",
        "version": "0.1.0",
        "id": "xgiMigration",
        "download_link": "https://nomo.app/webon/sgi2xgi.com/nomo.tar.gz"
    }

];

export const fetchWebons = () => {
    return new Promise((resolve) => {
        // Simulating a server delay
        setTimeout(() => {
            resolve(mockWebons);
        }, 1000);
    });
};