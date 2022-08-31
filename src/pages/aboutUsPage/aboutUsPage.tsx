import React from 'react'
import aboutus1 from '../../assets/aboutUs/aboutus1.svg'
import aboutus2 from '../../assets/aboutUs/aboutus2.svg'
import './aboutUsPage.scss'
import stock from '../../assets/aboutUs/stock.jpg'
import mikeLoopie from '../../assets/aboutUs/MikeLoopie.jpg'
import friends from '../../assets/aboutUs/unsplash - friends.jpg'
import teamplayers from '../../assets/aboutUs/teamplayers.jpg'
const AboutUsPage = () => {
    return (
        <div className='AboutUs_Container'>
            <img className='teast' src={aboutus1} alt="bagground1" />
            <div className='AboutUs_Wrapper'>
                <div className='AboutUs_Title'>About Us</div>
                <div className='AboutUs_TextContainer'>
                    <section>
                        <div className='AboutUs_Info'>
                            <div className='AboutUs_SubTitle'>A Game for Friends</div>
                            <div className='AboutUs_Text'>
                                <br/>
                                We wanted to create a game for you and your friends, which is fully customizable and can bring out what is special about your exact friendgroup.
                                Noboby knows your friends like you do, and with LoopieGame, you get to bring out the best, the worst and the goofy in them.
                                Get competetive and see who knows eachother the best, or get to know your friends even better.
                                We have made our platform web-based you can play anywhere and anytime, so get the party started and play a game of Loopie.
                            </div>
                        </div>
                        <div className='AboutUs_ImageContainer'>
                            <img src={friends} alt="friends" />
                        </div>
                    </section>
                    <section>
                        <div className='AboutUs_Info'>
                            <div className='AboutUs_SubTitle'>Easy to understand and Everyone is included</div>
                            <div className='AboutUs_Text'>
                                <br/>
                                The way of playing is heavily inspired be the rules of bingo. You get a board, filed with tiles and compete to see who
                                can complete it first. But instead of sitting quietly and waiting fo someone to yell out you numbers, you actively participate.
                                Why use numbers, when you can use your friend and their habits? Can you predict what your besties are gonna do tonight?
                                Get your board filled with predictions and watch it happen, or even better make sure it does by gently pushing them in the right direction!
                            </div>
                        </div>
                        <div className='AboutUs_ImageContainer'>
                            <img src={teamplayers} alt="stock" />
                        </div>
                    </section>
                    <section>
                        <div className='AboutUs_Info'>
                            <div className='AboutUs_SubTitle'>Our Company</div>
                            <div className='AboutUs_Text'>
                                <br/>
                                We established our company on a foundation of a great idea and our passion of games. We are 3 developers, currently using this game as our final project.
                                That means we are able to work on it full time, and that will be reflected as fast growth of this website and its uses. We hope you enjoy the game
                                and will continue to acompany us on our journey to make our game even greater!
                            </div>
                        </div>
                        <div className='AboutUs_ImageContainer'>
                            <img src={mikeLoopie} alt="stock" />
                        </div>
                    </section>
                </div>
            </div>
            <img className='teast' src={aboutus2} alt="bagground2" />
        </div>
    )
}

export default AboutUsPage