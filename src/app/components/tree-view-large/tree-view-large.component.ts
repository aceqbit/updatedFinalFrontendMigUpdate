import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TreeNode {
  id: string;
  label: string;
  checked: boolean;
  expanded: boolean;
  children?: TreeNode[];
  level: number;
}

@Component({
    selector: 'app-tree-view-large',
    templateUrl: './tree-view-large.component.html',
    styleUrls: ['./tree-view-large.component.css']
})
export class TreeViewLargeComponent implements OnInit {
  treeData: TreeNode[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.treeData = this.generateHeavyTree(5, 4); // ~1000 nodes
  }

  generateHeavyTree(depth: number, branching: number, currentLevel: number = 0): TreeNode[] {
    if (depth === 0) return [];
    
    const nodes: TreeNode[] = [];
    for (let i = 0; i < branching; i++) {
      const id = Math.random().toString(36).substring(7);
      nodes.push({
        id: id,
        label: `Node_${currentLevel}_${i}_${id}`,
        checked: false,
        expanded: currentLevel < 2,
        level: currentLevel,
        children: this.generateHeavyTree(depth - 1, branching, currentLevel + 1)
      });
    }
    return nodes;
  }

  toggleNode(node: TreeNode) {
    node.expanded = !node.expanded;
  }

  toggleCheck(node: TreeNode, checked: boolean) {
    node.checked = checked;
    if (node.children) {
      this.checkAllChildren(node.children, checked);
    }
  }

  expandAll() {
    this.setExpandedState(this.treeData, true);
  }

  private setExpandedState(nodes: TreeNode[], expanded: boolean) {
    nodes.forEach(node => {
      node.expanded = expanded;
      if (node.children) {
        this.setExpandedState(node.children, expanded);
      }
    });
  }

  checkAllChildren(children: TreeNode[], checked: boolean) {
    children.forEach(child => {
      child.checked = checked;
      if (child.children) this.checkAllChildren(child.children, checked);
    });
  }
}
