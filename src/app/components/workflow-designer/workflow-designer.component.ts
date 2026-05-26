import { Component, OnInit } from '@angular/core';


interface Node {
  id: string;
  type: 'action' | 'condition' | 'start' | 'end';
  x: number;
  y: number;
  label: string;
  data: any;
}

interface Connection {
  from: string;
  to: string;
}

@Component({
    selector: 'app-workflow-designer',
    templateUrl: './workflow-designer.component.html',
    styleUrls: ['./workflow-designer.component.css']
})
export class WorkflowDesignerComponent implements OnInit {
  nodes: Node[] = [];
  connections: Connection[] = [];

  isDragging = false;
  draggedNode: Node | null = null;
  
  constructor() { }

  ngOnInit(): void {
    this.generateHeavyWorkflow();
  }

  generateHeavyWorkflow() {
    // Generate a complex web of 40 nodes for stress testing
    for (let i = 0; i < 40; i++) {
      const type: ('action' | 'condition' | 'start' | 'end') = 
        i === 0 ? 'start' : (i === 39 ? 'end' : (i % 5 === 0 ? 'condition' : 'action'));
      
      this.nodes.push({
        id: `node-${i}`,
        type: type,
        x: (i % 5) * 250 + 100,
        y: Math.floor(i / 5) * 150 + 100,
        label: `${type.toUpperCase()} #${i}`,
        data: {
          config: { retry: 3, timeout: 5000, async: true },
          params: Array.from({ length: 10 }, (_, j) => `Param ${j}`)
        }
      });

      if (i > 0) {
        this.connections.push({ from: `node-${i - 1}`, to: `node-${i}` });
        if (i % 7 === 0) {
          this.connections.push({ from: `node-${Math.max(0, i - 5)}`, to: `node-${i}` });
        }
      }
    }
  }

  onNodeMouseDown(event: MouseEvent, node: Node) {
    event.stopPropagation();
    this.isDragging = true;
    this.draggedNode = node;
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.draggedNode) {
      this.draggedNode.x += event.movementX;
      this.draggedNode.y += event.movementY;
    }
  }

  onMouseUp() {
    this.isDragging = false;
    this.draggedNode = null;
  }

  getConnectionPath(conn: Connection): string {
    const fromNode = this.nodes.find(n => n.id === conn.from);
    const toNode = this.nodes.find(n => n.id === conn.to);
    
    if (!fromNode || !toNode) return '';
    
    const x1 = fromNode.x + 100;
    const y1 = fromNode.y + 30;
    const x2 = toNode.x;
    const y2 = toNode.y + 30;
    
    return `M ${x1} ${y1} C ${x1 + 50} ${y1}, ${x2 - 50} ${y2}, ${x2} ${y2}`;
  }

  getNodeColor(type: string): string {
    switch (type) {
      case 'start': return '#34a853';
      case 'end': return '#ea4335';
      case 'condition': return '#fbbc04';
      default: return '#4285f4';
    }
  }
}
