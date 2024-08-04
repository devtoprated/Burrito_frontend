import footerCss from './Footer.module.css';

import Facebook from '/images/facebook.png'
import Twitter from '/images/twitter.png'
import Instagram from '/images/instagram.png'
import Linkedin from '/images/linkedin.png'


let Footer = () => {
    return <div className={footerCss.footer}>
        <div className={footerCss.innerFooter}>
            <div className={footerCss.sec1}>
                <div className={footerCss.logoBox}>Burritos</div>
                
            </div>
            <div className={footerCss.sec2}>
                <div className={[footerCss.box1, footerCss.box].join(' ')}>
                    <div className={footerCss.boxTtl}>ABOUT BURRITOS</div>
                    <a href="" className={footerCss.boxOpt}>Who We Are</a>
                    <a href="" className={footerCss.boxOpt}>Blog</a>
                    <a href="" className={footerCss.boxOpt}>Work With Us</a>
                    <a href="" className={footerCss.boxOpt}>Investor Relations</a>
                    <a href="" className={footerCss.boxOpt}>Report Fraud</a>
                </div>
                <div className={[footerCss.box2, footerCss.box].join(' ')}>
                    <div className={footerCss.boxTtl}>TOMAVERSE</div>
                    <a href="" className={footerCss.boxOpt}>Burritos</a>
                    <a href="" className={footerCss.boxOpt}>Feeding India</a>
                    <a href="" className={footerCss.boxOpt}>Hyperpure</a>
                    <a href="" className={footerCss.boxOpt}>Tomaland</a>
                </div>
                <div className={[footerCss.box3, footerCss.box].join(' ')}>
                    <div className={footerCss.boxTtl}>FOR RESTAURANTS</div>
                    <a href="" className={footerCss.boxOpt}>Partner With Us</a>
                    <a href="" className={footerCss.boxOpt}>Apps For You</a>

                    <div className={footerCss.boxTtl}>FOR ENTERPRISES</div>
                    <a href="" className={footerCss.boxOpt}>Burritos For Work</a>
                </div>
                <div className={[footerCss.box4, footerCss.box].join(' ')}>
                    <div className={footerCss.boxTtl}>LEARN MORE</div>
                    <a href="" className={footerCss.boxOpt}>Privacy</a>
                    <a href="" className={footerCss.boxOpt}>Security</a>
                    <a href="" className={footerCss.boxOpt}>Terms</a>
                    <a href="" className={footerCss.boxOpt}>Sitemap</a>
                </div>
                <div className={[footerCss.box5, footerCss.box].join(' ')}>
                    <div className={footerCss.boxTtl}>SOCIAL LINKS</div>
                    <div className={footerCss.socialImgs}>
                        <a href="" className={footerCss.socialImgAnchore} >
                            <img className={footerCss.socialImg} src={Facebook} alt="linkedin" />
                        </a>
                        <a href="" className={footerCss.socialImgAnchore} >
                            <img className={footerCss.socialImg} src={Linkedin} alt="instagram" />
                        </a>
                        <a href="" className={footerCss.socialImgAnchore} >
                            <img className={footerCss.socialImg} src={Instagram} alt="facebook" />
                        </a>
                        <a href="" className={footerCss.socialImgAnchore} >
                            <img className={footerCss.socialImg} src={Twitter} alt="twitter" />
                        </a>
                    </div>
                </div>
            </div>
            <hr className={footerCss.breakLine} />
           
        </div>
    </div>
}

export default Footer;