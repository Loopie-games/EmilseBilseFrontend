import React from 'react'
import { Link } from 'react-router-dom'
import './terms.scss'

const Terms = () => {
    return (
        <div className='Terms_Container'>
            <div className='Terms_Wrapper'>
                <div className='Terms_HeadTitle'>
                    Website Terms and Conditions of Use
                </div>
                <section className='Terms_Section'>
                    <div className='Terms_SectionTitle'>
                        1. Terms
                    </div>
                    <div className='Terms_SectionContent'>
                        By accessing this Website, accessible from loopiegame.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.
                    </div>
                </section>
                <section className='Terms_Section'>
                    <div className='Terms_SectionTitle'>
                        2. Use License
                    </div>
                    <div className='Terms_SectionContent'>
                        Permission is granted to temporarily download one copy of the materials on Loopie Studio's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        <ul>
                            <li>modify or copy the materials;</li>
                            <li>use the materials for any commercial purpose or for any public display;</li>
                            <li>attempt to reverse engineer any software contained on Loopie Studio's Website;</li>
                            <li>remove any copyright or other proprietary notations from the materials; or</li>
                            <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
                        </ul>
                        This will let Loopie Studio to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format.
                    </div>
                </section>
                <section className='Terms_Section'>
                    <div className='Terms_SectionTitle'>
                        3. Disclaimer
                    </div>
                    <div className='Terms_SectionContent'>
                        All the materials on Loopie Studio’s Website are provided "as is". Loopie Studio makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Loopie Studio does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
                    </div>
                </section>
                <section className='Terms_Section'>
                    <div className='Terms_SectionTitle'>
                        4. Limitations
                    </div>
                    <div className='Terms_SectionContent'>
                        Loopie Studio or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Loopie Studio’s Website, even if Loopie Studio or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.
                    </div>
                </section>
                <section className='Terms_Section'>
                    <div className='Terms_SectionTitle'>
                        5. Revisions and Errata
                    </div>
                    <div className='Terms_SectionContent'>
                        The materials appearing on Loopie Studio’s Website may include technical, typographical, or photographic errors. Loopie Studio will not promise that any of the materials in this Website are accurate, complete, or current. Loopie Studio may change the materials contained on its Website at any time without notice. Loopie Studio does not make any commitment to update the materials.
                    </div>
                </section>
                <section className='Terms_Section'>
                    <div className='Terms_SectionTitle'>
                        6. Links
                    </div>
                    <div className='Terms_SectionContent'>
                        Loopie Studio has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by Loopie Studio of the site. The use of any linked website is at the user’s own risk.
                    </div>
                </section>
                <section className='Terms_Section'>
                    <div className='Terms_SectionTitle'>
                        7. Site Terms of Use Modifications
                    </div>
                    <div className='Terms_SectionContent'>
                        Loopie Studio may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.
                    </div>
                </section>
                <section className='Terms_Section'>
                    <div className='Terms_SectionTitle'>
                        8. Your Privacy
                    </div>
                    <div className='Terms_SectionContent'>

                        Please read our <Link to={'/privacy'} id="privacyLink">Privacy Policy.</Link>
                    </div>
                </section>
                <section className='Terms_Section'>
                    <div className='Terms_SectionTitle'>
                        9. Governing Law
                    </div>
                    <div className='Terms_SectionContent'>

                        Any claim related to Loopie Studio's Website shall be governed by the laws of dk without regards to its conflict of law provisions.</div>
                </section>

            </div>
        </div>
    )
}

export default Terms