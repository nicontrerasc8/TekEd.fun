import Head from "next/head";

export default function MetaTags({ 
    title = 'Matio - Un divertido aprendizaje en línea', 
    description = "Plataforma en línea para aprender matemáticas.", 
    }){

    return <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
    </Head>

}