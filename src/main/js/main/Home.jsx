import React from "react";
import {Link} from "react-router-dom";
import Carousel from "react-bootstrap/es/Carousel";
import Modal from "react-bootstrap/es/Modal";
import Button from "react-bootstrap/es/Button";
// import "../../resources/static/css/style.css";
// import "../../resources/static/css/scrolling-nav.css";
// import "../../resources/static/js/scrolling-nav/scrolling-nav";
// import "../../resources/static/js/scrolling-nav/jquery.easing.min";
// import "../../resources/static/js/bootstrap.min";
// import "../../resources/static/js/scripts";


class Home extends React.Component{

    componentDidMount(){
        document.title = "Gabinet Kosmetyczny URODA";
    }

    render(){
        return(
            <div>
            <link href={"/css/style.css"} rel={"stylesheet"}/>
            <link href={"/css/scrolling-nav.css"} rel={"stylesheet"}/>

                <div className="wrapper">
                    <div className="container-fluid CUSTOM-container-fluid">

                          {/*Navigation */}
                        <nav className="navbar navbar-default navbar-fixed-top myNavbar" role="navigation">
                            <div className="container">
                                <div className="navbar-header page-scroll">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"/>
                                        <span className="icon-bar"/>
                                        <span className="icon-bar"/>
                                    </button>
                                    <a className="navbar-brand page-scroll" href="http://lamp.ii.us.edu.pl/~ii302910/uroda-test/index.php">HOME</a>
                                </div>

                                {/*//  Collect the nav links, forms, and other content for toggling */}
                                <div className="collapse navbar-collapse navbar-ex1-collapse">
                                    <ul className="nav navbar-nav">
                                        {/*//  Hidden li included to remove active className from about link when scrolled up past about section */}
                                        <li className="hidden">
                                            <a className="page-scroll" href="#page-top"/>
                                        </li>
                                        <li>
                                            <a className="page-scroll" href="#">O NAS</a>
                                        </li>
                                        <li className="dropdown page-scroll">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">OFERTA<strong className="caret"/></a>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <a href="#">Zabiegi na twarz</a>
                                                </li>
                                                <li>
                                                    <a href="#">Zabiegi na ciało</a>
                                                </li>
                                                <li>
                                                    <a href="#">Manicure &amp; Pedicure</a>
                                                </li>
                                                <li>
                                                    <a href="#">Piercing</a>
                                                </li>
                                                <li className="divider">
                                                </li>
                                                <li>
                                                    <a href="#">Solarium</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            {/*// <a className="page-scroll" href="#">KONTAKT</a>*/}
                                            <a href="/auth/calendar">Zarządzanie</a>
                                        </li>
                                        <li>
                                            {/*<a className="page-scroll" href="https://lamp.ii.us.edu.pl/~ii302910/uroda-test/parts/login.php">KONTO</a>*/}
                                            <a href="/login">KONTO</a>
                                        </li>
                                    </ul>
                                </div>
                                {/*//  /.navbar-collapse */}
                            </div>
                            {/*//  /.container */}
                        </nav>


                        <section className="module parallax-first">
                            <div className="container">
                                <div className="row">  {/*// ============================== POCZĄTEK KARUZELI =======================================*/}
                                    <Carousel>
                                        <Carousel.Item>
                                            <img width={900} height={500} src={"/pics/uroda/Bea039.jpg"}/>
                                            <Carousel.Caption>
                                                <h4>Gabinet URODA</h4>
                                                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img width={900} height={500} src={"/pics/uroda/Bea087.jpg"}/>
                                            <Carousel.Caption>
                                                <h4>Nowość!</h4>
                                                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img width={900} height={500} src={"/pics/uroda/Bea056.jpg"}/>
                                            <Carousel.Caption>
                                                <h4>Jedyny w Olkuszu, oryginalny Integral</h4>
                                                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    </Carousel>

                                    {/*<div className="col-md-12 mainCarousel">*/}
                                        {/*<div className="carousel slide" id="carousel-12078">*/}
                                            {/*<ol className="carousel-indicators">*/}
                                                {/*<li className="active" data-slide-to="0" data-target="#carousel-12078">*/}
                                                {/*</li>*/}
                                                {/*<li data-slide-to="1" data-target="#carousel-12078">*/}
                                                {/*</li>*/}
                                                {/*<li data-slide-to="2" data-target="#carousel-12078">*/}
                                                {/*</li>*/}
                                            {/*</ol>*/}
                                            {/*<div className="carousel-inner">*/}
                                                {/*<div className="item active">*/}
                                                    {/*<img alt="Carousel Bootstrap First" src="../../resources/static/pics/uroda/Bea039.jpg"/>*/}
                                                    {/*<div className="carousel-caption">*/}
                                                        {/*<h4>*/}
                                                            {/*Gabinet URODA*/}
                                                        {/*</h4>*/}
                                                        {/*<p>*/}
                                                            {/*Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.*/}
                                                        {/*</p>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                                {/*<div className="item">*/}
                                                    {/*<img alt="Carousel Bootstrap Second" src="../../resources/static/pics/uroda/Bea087.jpg"/>*/}
                                                    {/*<div className="carousel-caption">*/}
                                                        {/*<h4>*/}
                                                            {/*Nowość!*/}
                                                        {/*</h4>*/}
                                                        {/*<p>*/}
                                                            {/*Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.*/}
                                                        {/*</p>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                                {/*<div className="item">*/}
                                                    {/*<img alt="Carousel Bootstrap Third" src="../../resources/static/pics/uroda/Bea056.jpg"/>*/}
                                                    {/*<div className="carousel-caption">*/}
                                                        {/*<h4>*/}
                                                            {/*Jedyny w Olkuszu, oryginalny Integral*/}
                                                        {/*</h4>*/}
                                                        {/*<p>*/}
                                                            {/*Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.*/}
                                                        {/*</p>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            {/*</div> <a className="left carousel-control" href="#carousel-12078" data-slide="prev"><span className="glyphicon glyphicon-chevron-left"/></a> <a className="right carousel-control" href="#carousel-12078" data-slide="next"><span className="glyphicon glyphicon-chevron-right"></span></a>*/}
                                        {/*</div>*/}
                                        {/*<div className="row">*/}
                                            {/*<div className="col-md-12">*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                </div>  {/*//================================== KONIEC KARUZELI ===========================================*/}
                            </div>
                        </section>


                        <section className="module content">
                            <div className="container">
                                <div className="col-md-12 customInfo">
                                    <h2>
                                        NASZ GABINET
                                    </h2>
                                    <p>
                                        Profesjonalnie zajmie się pięknem i harmonią twojego ciała.
                                    </p>
                                </div>

                            </div>
                        </section>
                        <section className="module parallax parallax-2">
                            <div className="container">
                                <h1>Shape</h1>
                            </div>
                        </section>
                        <section className="module content">
                            <div className="container">
                                <div className="col-md-12 customInfo">
                                    <h2>
                                        NASZ GABINET
                                    </h2>
                                    <p>
                                        Profesjonalnie zajmie się pięknem i harmonią twojego ciała.
                                    </p>
                                </div>
                            </div>
                        </section>









                    </div>

                    <footer id="footer" className="col-md-12">
                        <div className="footer-high">
                            <div id="footer-content">
                                <div className="footer-box">
                                    <h4>GABINET URODA</h4>
                                    <p>Luksusowy salon kosmetyczny w Olkuszu oferujący zabiegi na twarz i ciało, manicure i pedicure, solarium oraz make-up.</p>
                                </div>
                                <div className="footer-box">
                                    <h4>KONTAKT</h4>
                                    <p>
                                        Bylicy 1 pok. 10
                                    </p>
                                    <p>
                                        32-300, Olkusz
                                    </p>
                                    <p>
                                        &#128379; 663 166 872
                                        &#9993; uroda.beata@interia.pl
                                    </p>
                                </div>
                                <div className="footer-box">
                                    <h4>LOKALIZACJA</h4>
                                    <div id="map"/>
                                </div>
                                <div id="footer-facebook" className="footer-box">
                                    <h4>
                                        ZNAJDŹ NAS NA FACEBOOKU!
                                    </h4>
                                    <div id="fb-root">
                                        <div className="fb-page" data-href="https://www.facebook.com/Uroda-154135884631613/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
                                            <blockquote cite="https://www.facebook.com/Uroda-154135884631613/" className="fb-xfbml-parse-ignore">
                                                <a href="https://www.facebook.com/Uroda-154135884631613/">Uroda</a>
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-low">
                            <div className="footerDetailsLeft">
                                <p>&#169;2017 - Gabinet Kosmetyczny URODA Genowefa Banyś</p>
                            </div>
                            <div className="footerDetailsRight">
                                <p>designed by Adam Bigaj</p>
                            </div>
                        </div>

                    </footer>

                </div>

            </div>
        );
    };
}

export default Home;