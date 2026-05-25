import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  modified: Date;
  owner: string;
  permissions: string;
  children?: FileNode[];
  isOpen?: boolean;
}

@Component({
    selector: 'app-file-explorer',
    templateUrl: './file-explorer.component.html',
    styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit {
  fileTree: FileNode[] = [];
  selectedFile: FileNode | null = null;
  
  constructor() { }

  ngOnInit(): void {
    this.generateHeavyFileSystem();
  }

  generateHeavyFileSystem() {
    // Generate a deep tree of 500+ items
    const root: FileNode = {
      id: 'root',
      name: 'ENTERPRISE_SYSTEM_V3',
      type: 'folder',
      modified: new Date(),
      owner: 'ADMIN',
      permissions: 'RWX',
      children: [],
      isOpen: true
    };

    for (let i = 0; i < 15; i++) {
      const subFolder: FileNode = {
        id: `folder-${i}`,
        name: `SubModule_${i}`,
        type: 'folder',
        modified: new Date(),
        owner: 'SYSTEM',
        permissions: 'RW-',
        children: [],
        isOpen: false
      };

      for (let j = 0; j < 30; j++) {
        subFolder.children?.push({
          id: `file-${i}-${j}`,
          name: `Resource_data_final_v${j}.bin`,
          type: 'file',
          size: Math.random() * 1024 * 1024,
          modified: new Date(),
          owner: 'DEV_AGENT',
          permissions: 'R--'
        });
      }
      root.children?.push(subFolder);
    }

    this.fileTree = [root];
  }

  toggleFolder(node: FileNode) {
    if (node.type === 'folder') {
      node.isOpen = !node.isOpen;
    }
    this.selectedFile = node;
  }

  formatSize(bytes: number | undefined): string {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
