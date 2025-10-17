import React from 'react'
import CryptoNavbar from '../components/shared/CryptoNavbar'
import CryptoFooter from '../components/shared/CryptoFooter'

export default function layout({ children }) {
    return (
        <section>
            <CryptoNavbar />
            <main>
                {children}
            </main>
            <CryptoFooter />
        </section>
    )
}
