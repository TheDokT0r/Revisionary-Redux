import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import styles from './About.module.scss'

export default function About() {
    const copyPasta = `I fucking hate Tibby. I want to rip his tiny limbs apart as he screams in agony. I’ll laugh and say “Let’s we go amigo!” as I send him straight to Hell where he belongs.`;

    const actualAbout = `This app is made to asscist students in their studyin endevours, and make everyone le happy :)`;

    const [txt, setTxt] = React.useState(whichOneShallIPick);

    function whichOneShallIPick() {
        const rng = Math.floor(Math.random() * 20) + 1;

        if (rng === 20) {
            return copyPasta;
        }

        return actualAbout;
    }

    return (
        <>
            <Navbar />

            <div>
                <h1>About This App</h1>
                <p>{txt}</p>
            </div>
        </>
    )
}
