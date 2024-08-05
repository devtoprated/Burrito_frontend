
import { useState } from 'react';
import css from './HomePageBanner.module.css';
import NavigationBar from '../Navbars/NavigationBar/NavigationBar';

let HomePageBanner = () => {
    let [toggleMenu, setToggleMenu] = useState(true);

    let toggleBanner = toggleMenu ? (
        <div className={css.banner}>
            <NavigationBar setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
            <div className={css.bannerInner}>
                <img
                    src="https://images.unsplash.com/photo-1532420633514-05d9096b4fb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="banner"
                    className={css.bannerImg}
                />
                <div className={css.bannerTxt}>
                    <div className={css.title}>Burritos</div>
                    <div className={css.tag}>
                        Discover the perfect bite every time with Burrito! Our smart food suggestion engine curates the best dining options tailored to your tastes. Whether you’re craving a spicy taco or a sweet dessert, Burrito’s got you covered. Explore, taste, and indulge in a world of culinary delights. Your next favorite meal is just a click away!
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <MobileNavbar setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
    );

    return toggleBanner;
};

export default HomePageBanner;
