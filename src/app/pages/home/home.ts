import { Component } from '@angular/core';
import { NavBar } from "../../layout/nav-bar/nav-bar";
import { MainComp } from "../../shared/home-comp/main-comp/main-comp";
import { WhySection } from "../../shared/home-comp/why-section/why-section";
import { SubscriptionCard } from "../../shared/home-comp/subscription-card/subscription-card";
import { ExploreSection } from '../../shared/home-comp/explore-section/explore-section';
import { CardsSection } from '../../shared/home-comp/cards-section/cards-section';
import { FooterSection } from '../../shared/home-comp/footer-section/footer-section';

@Component({
  selector: 'app-home',
  imports: [NavBar, MainComp, WhySection, ExploreSection, CardsSection, SubscriptionCard, FooterSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
