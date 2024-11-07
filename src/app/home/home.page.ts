import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  cards = [
    {
      title: 'Agendamento Rápido',
      content: 'Agende suas viagens em poucos cliques, escolhendo destinos e datas de forma prática.'
    },
    {
      title: 'Viagens em Grupo',
      content: 'Organize viagens para grupos, com gestão simplificada de múltiplos passageiros.'
    },
    {
      title: 'Histórico Completo',
      content: 'Acesse todo seu histórico de viagens e mantenha o controle de seus agendamentos.'
    },
    {
      title: 'Perfil Personalizado',
      content: 'Mantenha suas preferências e informações atualizadas para uma experiência única.'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  getCardIcon(title: string): string {
    const iconMap: { [key: string]: string } = {
      'Agendamento Rápido': 'calendar-outline',
      'Viagens em Grupo': 'people-outline',
      'Histórico Completo': 'time-outline',
      'Perfil Personalizado': 'person-outline'
    };
    return iconMap[title] || 'help-outline';
  }
}
