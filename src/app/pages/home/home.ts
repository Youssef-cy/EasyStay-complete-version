import { Component } from '@angular/core';
import { NavBar } from "../../layout/nav-bar/nav-bar";
import { MainComp } from "../../shared/main-comp/main-comp";
import { WhySection } from "../../shared/why-section/why-section";
import { ExploreSection } from "../../shared/explore-section/explore-section";
import { CardsSection } from "../../shared/cards-section/cards-section";
import { SubscriptionCard } from "../../shared/subscription-card/subscription-card";
import { FooterSection } from "../../shared/footer-section/footer-section";

@Component({
  selector: 'app-home',
  imports: [NavBar, MainComp, WhySection, ExploreSection, CardsSection, SubscriptionCard, FooterSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
