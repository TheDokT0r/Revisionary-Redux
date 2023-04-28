declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_SERVER_URL:string;
            REACT_APP_TEST:string;
        }
    }
}

export {}; //Dummy export to make this file a module