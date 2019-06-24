import React from 'react';
import { Link } from 'react-router-dom'
import DefaultLayout from '../../components/DefaultLayout'
import { Image, Header } from 'semantic-ui-react'


import logo from '../../assets/404.svg'


const NotFound = ({ location }) => <div>
    {!(location.pathname === "/" || location.pathname === "/login") && (<DefaultLayout header verticalAlign="middle" rowMargin='-100px' textAlign="center" gridStyles={{ height: '100vh' }
    } columnStyles={{ maxWidth: 320 }}>

        <Image src={logo} size="big" centered alt="Page not found" />
        <Header
            as='h1'
            content='Página não encontrada'
        />
        <Link to="/transactions">Voltar</Link>
    </DefaultLayout >)
    }
</div>




export default NotFound