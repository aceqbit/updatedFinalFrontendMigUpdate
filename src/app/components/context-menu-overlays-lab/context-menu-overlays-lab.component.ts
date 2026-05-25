import { Component, HostListener } from '@angular/core';


interface MenuCard {
  id: string;
  title: string;
  description: string;
  accent: string;
  pinned?: boolean;
}

@Component({
    selector: 'app-context-menu-overlays-lab',
    templateUrl: './context-menu-overlays-lab.component.html',
    styleUrls: ['./context-menu-overlays-lab.component.css']
})
export class ContextMenuOverlaysLabComponent {
  cards: MenuCard[] = [
    { id: 'route-editor', title: 'Route Editor', description: 'Right-click to manage navigation actions.', accent: '#0f62fe' },
    { id: 'policy-board', title: 'Policy Board', description: 'Overlay custom actions without leaving the card.', accent: '#0f766e' },
    { id: 'release-view', title: 'Release View', description: 'Expose quick actions with a focused radial feel.', accent: '#b45309' }
  ];

  menu = {
    visible: false,
    x: 0,
    y: 0,
    card: null as MenuCard | null,
  };

  actions = ['Duplicate', 'Pin', 'Delete'];
  lastAction = 'Right-click any card to open the custom overlay.';

  openMenu(event: MouseEvent, card: MenuCard) {
    event.preventDefault();
    this.menu = {
      visible: true,
      x: event.clientX,
      y: event.clientY,
      card,
    };
  }

  performAction(action: string) {
    const target = this.menu.card;

    if (!target) {
      this.menu.visible = false;
      return;
    }

    switch (action) {
      case 'Duplicate':
        this.duplicateCard(target);
        this.lastAction = `Duplicated ${target.title}`;
        break;
      case 'Pin':
        this.pinCard(target);
        this.lastAction = `Pinned ${target.title} to top`;
        break;
      case 'Delete':
        this.deleteCard(target);
        this.lastAction = `Deleted ${target.title}`;
        break;
      default:
        this.lastAction = `${action} executed for ${target.title}`;
        break;
    }

    this.menu.visible = false;
  }

  private duplicateCard(card: MenuCard) {
    const index = this.cards.findIndex(item => item.id === card.id);
    if (index < 0) return;

    const duplicate: MenuCard = {
      ...card,
      id: `${card.id}-copy-${Date.now()}`,
    };

    this.cards = [
      ...this.cards.slice(0, index + 1),
      duplicate,
      ...this.cards.slice(index + 1),
    ];
  }

  private pinCard(card: MenuCard) {
    this.cards = [
      { ...card, pinned: true },
      ...this.cards.filter(item => item.id !== card.id),
    ];
  }

  private deleteCard(card: MenuCard) {
    this.cards = this.cards.filter(item => item.id !== card.id);
  }

  @HostListener('document:click')
  closeMenu() {
    this.menu.visible = false;
  }
}