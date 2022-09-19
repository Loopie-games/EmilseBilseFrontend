import React from 'react'
import './privacyPage.scss'
import { Link } from 'react-router-dom'

const PrivacyPage = () => {
    return (
        <div className='Privacy_Container'>
            <div className='Privacy_Wrapper'>
                <div className='Privacy_HeadTitle'>
                    Privacy Policy for Loopie Studio
                </div>
                <div className='Privacy_HeadContent'>
                    At Loopie Studio, accessible from loopiestudio.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Loopie Studio and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                </div>
                <section className='Privacy_Section'>
                    <div className='Privacy_SectionTitle'>
                        General Data Protection Regulation (GDPR)

                    </div>
                    <div className='Privacy_SectionContent'>
                        We are a Data Controller of your information.
                        <br /><br />

                        Loopie Studio legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Information we collect and the specific context in which we collect the information:
                        <br /><br />
                        <ul>
                            <li>Loopie Studio needs to perform a contract with you</li>
                            <li>You have given Loopie Studio permission to do so </li>
                            <li>
                                Processing your personal information is in Loopie Studio legitimate interests
                            </li>
                            <li>Loopie Studio needs to comply with the law</li>
                        </ul>
                        Loopie Studio will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
                        <br /><br />
                        If you are a resident of the European Economic Area (EEA), you have certain data protection rights. If you wish to be informed what Personal Information we hold about you and if you want it to be removed from our systems, please contact us.
                        <br /><br />
                        In certain circumstances, you have the following data protection rights:

                        <ul>
                            <li>The right to access, update or to delete the information we have on you.</li>
                            <li>The right of rectification.</li>
                            <li>The right to object.</li>
                            <li>The right of restriction.</li>
                            <li>The right to data portability</li>
                            <li>The right to withdraw consent</li>
                        </ul>

                    </div>
                </section>
                <section className='Privacy_Section'>
                    <div className='Privacy_SectionTitle'>
                        Log Files

                    </div>
                    <div className='Privacy_SectionContent'>
                        Loopie Studio follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
                    </div>
                </section>
                <section className='Privacy_Section'>
                    <div className='Privacy_SectionTitle'>
                        Cookies and Web Beacons

                    </div>
                    <div className='Privacy_SectionContent'>
                        Like any other website, Loopie Studio uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                    </div>
                </section>
                <section className='Privacy_Section'>
                    <div className='Privacy_SectionTitle'>
                        Privacy Policies

                    </div>
                    <div className='Privacy_SectionContent'>
                        You may consult this list to find the Privacy Policy for each of the advertising partners of Loopie Studio.
                        <br /><br />
                        Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Loopie Studio, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                        <br /><br />
                        Note that Loopie Studio has no access to or control over these cookies that are used by third-party advertisers.</div>
                </section>
                <section className='Privacy_Section'>
                    <div className='Privacy_SectionTitle'>
                        Third Party Privacy Policies
                    </div>
                    <div className='Privacy_SectionContent'>
                        Loopie Studio's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                        <br /><br />
                        You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
                    </div>
                </section>
                <section className='Privacy_Section'>
                    <div className='Privacy_SectionTitle'>
                        Children's Information
                    </div>
                    <div className='Privacy_SectionContent'>
                        Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                        <br /><br />
                        Loopie Studio does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                    </div>
                </section>
                <section className='Privacy_Section'>
                    <div className='Privacy_SectionTitle'>
                        Online Privacy Policy Only
                    </div>
                    <div className='Privacy_SectionContent'>
                        Our Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Loopie Studio. This policy is not applicable to any information collected offline or via channels other than this website.
                    </div>
                </section>
                <section className='Privacy_Section'>
                    <div className='Privacy_SectionTitle'>
                        Consent
                    </div>
                    <div className='Privacy_SectionContent'>
                        By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                    </div>
                </section>
            </div>
        </div>
    )
}

export default PrivacyPage