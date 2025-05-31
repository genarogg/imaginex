'use client'
import React from 'react'
import Img from '@/components/Img'
import imgLocal from "../../public/nanify.webp"

interface imgProps { }

const img: React.FC<imgProps> = () => {

    const remote = "https://images.unsplash.com/photo-1560707303-4e980ce876ad?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNvdXJjZXxlbnwwfHwwfHx8MA%3D%3D"

    const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAI0lEQVR4nGN48H9K03L3M6/rGmZ4MDDwM/jnm07bmzJ5VRoAqwgL1RTPjO0AAAAASUVORK5CYII="

    const width = 1920 / 3;
    const height = 1080 / 3;

    return (
        <>
            <h3>Img Remote</h3>
            <p>Componente Img para imágenes remotas</p>
            <div className="" style={{ display: "flex", justifyContent: "space-around" }}>
                <div className="" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <h4>Sin blurDataURL</h4>
                    <Img type="remote" src={remote} alt="demo" id='demo' style={{ border: "1px solid red" }} width={width} height={height} />
                </div>
                <div className="" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <h4>Con blurDataURL</h4>
                    <Img type="remote" src={remote} alt="demo" id='demo2' blurDataURL={base64} style={{ border: "1px solid red" }} width={width} height={height} />
                </div>
            </div>
            <br />
            Uso del componente <code>{'<Img type="remote" src={remote} alt="demo" id="demo" style={{ border: "1px solid red" }} width={width} height={height} />'}</code>
            <ul>
                <li className="prosp">El componente `Img` se utiliza para mostrar una imagen remota.</li>
                <li className="prosp">Props:</li>
                <ul>
                    <li><strong>type</strong>: Tipo de imagen (remote).</li>
                    <li><strong>src</strong>: URL de la imagen.</li>
                    <li><strong>alt</strong>: Texto alternativo para la imagen.</li>
                    <li><strong>id</strong>: ID del elemento.</li>
                    <li><strong>blurDataURL</strong>: URL de la imagen borrosa para el placeholder.</li>
                    <li><strong>width</strong>: Ancho de la imagen.</li>
                    <li><strong>height</strong>: Altura de la imagen.</li>
                    <li><strong>style</strong>: Estilos CSS para la imagen.</li>
                </ul>
            </ul>

            <h3>Img Local</h3>
            <p>Componente Img para imágenes locales</p>
            <div className="" style={{ display: "flex", justifyContent: "space-around" }}>
                <div className="" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <h4>Normal</h4>
                    <Img type="local" src={imgLocal} alt="demo" id='demo' style={{ border: "1px solid red" }} width={width} height={height} />
                </div>
                <div className="" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <h4>Background</h4>
                    <Img type="bg" src={imgLocal} alt="demo" id='dedasmo' style={{ border: "1px solid red", display: "flex", justifyContent: "center", alignItems: "center" }} width={width} height={height} >
                        <h1>hola</h1>
                    </Img>
                </div>
            </div>
            <br />
            Uso del componente <code>{'<Img type="local" src={imgLocal} alt="demo" id="demo" style={{ border: "1px solid red" }} width={width} height={height} />'}</code>
            <ul>
                <li className="prosp">El componente `Img` se utiliza para mostrar una imagen local.</li>
                <li className="prosp">Props:</li>
                <ul>
                    <li><strong>type</strong>: Tipo de imagen (local).</li>
                    <li><strong>src</strong>: Ruta de la imagen.</li>
                    <li><strong>alt</strong>: Texto alternativo para la imagen.</li>
                    <li><strong>id</strong>: ID del elemento.</li>
                    <li><strong>width</strong>: Ancho de la imagen.</li>
                    <li><strong>height</strong>: Altura de la imagen.</li>
                    <li><strong>style</strong>: Estilos CSS para la imagen.</li>
                </ul>
            </ul>

            <h3>Nota</h3>
            <p>Asegúrate de agregar el siguiente dominio a la configuración de tu archivo <code>next.config.ts</code> para permitir imágenes de Unsplash:</p>
            <pre>
                <code>
                    {`
                    // @ts-check
                    import withPlaiceholder from "@plaiceholder/next";
                    
                    /**
                     * @type {import('next').NextConfig}
                     */
                    
                    const config = {
                      reactStrictMode: true,
                      images: {
                        domains: [
                          "images.unsplash.com",
                        ],
                      },
                    };
                    
                    export default withPlaiceholder(config);
                    `}
                </code>
            </pre>
        </>
    );
}

export default img;