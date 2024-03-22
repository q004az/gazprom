import '../../styles/Footer.css'

export default function Footer(){
    return(
        <footer class="page-footer">
            <div class="container">
                <p class="page-footer__name-copmany">
                    © 2024 ООО «Газпром трансгаз Томск»
                </p>
                <div class="page-footer__contacts-wrapper">
                    <h3 class="contacts__title">
                    Контакты
                    </h3>
                    <a class="contacts__connection" href="mailto:pochta@gmail.com">
                    Email: pochta@gmail.com <br/>
                    </a>
                    <a class="contacts__connection" href="tel:+7-888-898-88-13">
                    +7 888 898-88-13
                    </a>
                </div>
                <div class="page-footer__block">
                    <picture class="page-footer__logo">
                        <img class="page-footer__img" src="../../../assets/icons/logo.svg" alt="gazprom-logo.png"/>
                    </picture>
                </div>
            </div>
        </footer>
    )
}