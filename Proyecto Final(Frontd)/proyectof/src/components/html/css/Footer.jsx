import axios from 'axios';
import { useState, useEffect } from 'react';

export function Footer() {

    return (
       <footer>

        <section id='sectionFF'>
            <div className='divFF'>
                <a className='aFF' href='/'>Inicio</a>
                <a className='aFF' href='/categorias/videojuegos'>Videojuegos</a>
                <a className='aFF' href='/categorias/deporte'>Deportes</a>
            </div>

            <div className='divFF'>
                <a className='aFF' href='/categorias/musica'>Música</a>
                <a className='aFF' href='/categorias/tecnologia'>Tecnologia</a>
                <a className='aFF' href='/carrito'>Carrito</a>
            </div>

            <div className='divFF'>
                <a className='aFF' href='/login'>Iniciar Sesión</a>
                <a className='aFF' href='/register'>Registrarse</a>
                <a className='aFF' href='/privada'>Perfil</a>
            </div>

            <div className='divFF'>
                <a className='aFF' href='/uploads'>Vender</a>
                <a className='aFF' href='/sellerConfig'>Reportes</a>
                <a className='aFF' href='/seller'>¿Quieres ser Vendedor?</a>
            </div>        
        </section>

        

        <section id='sectionFFB'>
                <img id='logoFFB'
                    src="../public/Imagenes-Proyecto/logo shop.png" 
                    alt="imagen del logo" />
                <a id='pFFB' href='/' style={{ textDecoration: 'none' }}>MyStore</a>
        </section>

       </footer>
    )
}