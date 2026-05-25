import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Note {
  id: number;
  title: string;
  content: string;
  x: number;
  y: number;
  color: string;
  isPinned: boolean;
  lastModified: Date;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-sticky-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sticky-notes.component.html',
  styleUrls: ['./sticky-notes.component.css']
})
export class StickyNotesComponent implements OnInit {
  notes: Note[] = [];
  colors = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF'];
  
  draggedNote: Note | null = null;
  offsetX = 0;
  offsetY = 0;

  constructor() { }

  ngOnInit(): void {
    this.generateHeavyData();
  }

  generateHeavyData() {
    for (let i = 0; i < 50; i++) {
      this.notes.push({
        id: i,
        title: `Note #${i}`,
        content: `This is a heavy content for note number ${i}. We are testing the rendering performance of multiple sticky notes on a board. ${'lorem ipsum '.repeat(10)}`,
        x: Math.random() * 800,
        y: Math.random() * 600,
        color: this.colors[i % this.colors.length],
        isPinned: Math.random() > 0.8,
        lastModified: new Date(),
        tags: ['stress-test', 'angular-16', 'heavy-data'],
        priority: i % 3 === 0 ? 'high' : (i % 3 === 1 ? 'medium' : 'low')
      });
    }
  }

  addNote() {
    const newNote: Note = {
      id: Date.now(),
      title: 'New Note',
      content: '',
      x: 100,
      y: 100,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      isPinned: false,
      lastModified: new Date(),
      tags: [],
      priority: 'low'
    };
    this.notes.push(newNote);
  }

  deleteNote(id: number) {
    this.notes = this.notes.filter(n => n.id !== id);
  }

  onMouseDown(event: MouseEvent, note: Note) {
    if (note.isPinned) return;
    this.draggedNote = note;
    this.offsetX = event.clientX - note.x;
    this.offsetY = event.clientY - note.y;
  }

  onMouseMove(event: MouseEvent) {
    if (this.draggedNote) {
      this.draggedNote.x = event.clientX - this.offsetX;
      this.draggedNote.y = event.clientY - this.offsetY;
      this.draggedNote.lastModified = new Date();
    }
  }

  onMouseUp() {
    this.draggedNote = null;
  }

  trackByNoteId(index: number, note: Note) {
    return note.id;
  }

  getPinnedCount() {
    return this.notes.filter(n => n.isPinned).length;
  }

  updateNoteContent(note: Note, event: any) {
    note.content = event.target.value;
    note.lastModified = new Date();
  }

  togglePin(note: Note) {
    note.isPinned = !note.isPinned;
  }

  changeColor(note: Note) {
    const currentIndex = this.colors.indexOf(note.color);
    note.color = this.colors[(currentIndex + 1) % this.colors.length];
  }
}
