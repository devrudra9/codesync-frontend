import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCard } from '../../shared/components/stat-card/stat-card';

import { DashboardStat } from './models/dashboard-stat';
import { RecentWorkspace } from './models/recent-workspace';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  stats: DashboardStat[] = [
    {
      title: 'Workspaces',
      value: 4,
      icon: '💻',
      color: '#2563eb',
    },
    {
      title: 'Projects',
      value: 12,
      icon: '📁',
      color: '#059669',
    },
    {
      title: 'Collaborators',
      value: 8,
      icon: '👥',
      color: '#9333ea',
    },
    {
      title: 'Executions',
      value: 156,
      icon: '⚡',
      color: '#ea580c',
    },
  ];

  recentWorkspaces: RecentWorkspace[] = [
    {
      id: 1,
      name: 'Java Interview Prep',
      description: 'Spring Boot and Microservices',
      updatedAt: '2 hours ago',
    },
    {
      id: 2,
      name: 'System Design',
      description: 'Scalable Backend Notes',
      updatedAt: 'Yesterday',
    },
    {
      id: 3,
      name: 'Angular Learning',
      description: 'CodeSync Frontend',
      updatedAt: '3 days ago',
    },
  ];
}
