import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

class AutoTrieNode {
  children = new Map<string, AutoTrieNode>();
  ids = new Set<number>();
}

class AutoTrie {
  private root = new AutoTrieNode();

  insert(text: string, id: number) {
    const tokens = text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean);
    for (const token of tokens) {
      let node = this.root;
      for (const char of token) {
        if (!node.children.has(char)) {
          node.children.set(char, new AutoTrieNode());
        }
        node = node.children.get(char)!;
        node.ids.add(id);
      }
    }
  }

  search(query: string): Set<number> {
    const tokens = query.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean);
    if (!tokens.length) {
      return new Set();
    }

    let result: Set<number> | null = null;
    for (const token of tokens) {
      let node = this.root;
      for (const char of token) {
        const next = node.children.get(char);
        if (!next) {
          return new Set();
        }
        node = next;
      }
      result = result
        ? new Set(Array.from(result as Set<number>).filter((id) => node.ids.has(id)))
        : new Set(Array.from(node.ids as Set<number>));
    }

    return result ?? new Set();
  }
}

interface SearchResult {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  score: number;
}

@Component({
    selector: 'app-autocomplete-complex',
    templateUrl: './autocomplete-complex.component.html',
    styleUrls: ['./autocomplete-complex.component.css']
})
export class AutoCompleteComplexComponent implements OnInit {
  query: string = '';
  results: SearchResult[] = [];
  groupedResults: { [key: string]: SearchResult[] } = {};
  isLoading: boolean = false;
  
  allData: SearchResult[] = [];
  private trie = new AutoTrie();

  constructor() { }

  ngOnInit(): void {
    this.generateHeavyData();
  }

  generateHeavyData() {
    const categories = ['Users', 'Projects', 'Documents', 'Tasks', 'Settings', 'Archive'];
    for (let i = 0; i < 1000; i++) {
      this.allData.push({
        id: i,
        category: categories[i % categories.length],
        title: `Search Item #${i} - ${Math.random().toString(36).substring(7)}`,
        description: `This is a heavy description for item ${i} to test performance. `.repeat(5),
        image: `https://ui-avatars.com/api/?name=Item+${i}&background=random`,
        score: Math.random() * 100
      });
      const item = this.allData[this.allData.length - 1];
      this.trie.insert(`${item.title} ${item.description} ${item.category}`, item.id);
    }
  }

  onInput() {
    if (this.query.length < 2) {
      this.results = [];
      this.groupedResults = {};
      return;
    }

    this.isLoading = true;
    const resultIds = this.trie.search(this.query);
    this.results = this.allData.filter(item => resultIds.has(item.id)).slice(0, 40);
    this.groupResults();
    this.isLoading = false;
  }

  groupResults() {
    this.groupedResults = {};
    this.results.forEach(item => {
      if (!this.groupedResults[item.category]) {
        this.groupedResults[item.category] = [];
      }
      this.groupedResults[item.category].push(item);
    });
  }

  highlightMatch(text: string): string {
    if (!this.query) return text;
    const re = new RegExp(this.query, 'gi');
    return text.replace(re, match => `<mark>${match}</mark>`);
  }

  getGroupKeys() {
    return Object.keys(this.groupedResults);
  }

  selectResult(item: SearchResult) {
    this.query = item.title;
    this.results = [item];
    this.groupResults();
  }
}
