import React, {Component} from 'react';
import Node from './Node/Node';
import {useState} from 'react';
import classNames from 'classnames';
import {dijkstra} from '../algorithms/dijkstra';
import {AStar} from '../algorithms/aStar';
import {dfs} from '../algorithms/dfs';
import {bfs} from '../algorithms/bfs';
import {bellmanFord} from '../algorithms/bellmanford'; // Import Bellman-Ford algorithm
import vancouver from '../assets/images/vancouver.png';
import locations from '../location.json';




import './pathfindingVisualizer.css';



export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      START_NODE_ROW: 5,
      FINISH_NODE_ROW: 5,
      START_NODE_COL: 5,
      FINISH_NODE_COL: 15,
      mouseIsPressed: false,
      ROW_COUNT: 28,
      COLUMN_COUNT: 61,
      MOBILE_ROW_COUNT: 10,
      MOBILE_COLUMN_COUNT: 20,
      isRunning: false,
      isStartNode: false,
      isFinishNode: false,
      isWallNode: false,
      currRow: 0,
      currCol: 0,
      isDesktopView: true,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.toggleIsRunning = this.toggleIsRunning.bind(this);
  }

  componentDidMount() {
    const grid = this.getInitialGrid();
    this.setState({grid});
  }

  

  toggleIsRunning() {
    this.setState({isRunning: !this.state.isRunning});
  }

  toggleView() {
    if (!this.state.isRunning) {
      this.clearGrid();
      // this.clearWalls();
      const isDesktopView = !this.state.isDesktopView;
      let grid;
      if (isDesktopView) {
        grid = this.getInitialGrid(
          this.state.ROW_COUNT,
          this.state.COLUMN_COUNT,
        );
        this.setState({isDesktopView, grid});
      } else {
        if (
          this.state.START_NODE_ROW > this.state.MOBILE_ROW_COUNT ||
          this.state.FINISH_NODE_ROW > this.state.MOBILE_ROW_COUNT ||
          this.state.START_NODE_COL > this.state.MOBILE_COLUMN_COUNT ||
          this.state.FINISH_NODE_COL > this.state.MOBILE_COLUMN_COUNT
        ) {
          alert('Start & Finish Nodes Must Be within 10 Rows x 20 Columns');
        } else {
          grid = this.getInitialGrid(
            this.state.MOBILE_ROW_COUNT,
            this.state.MOBILE_COLUMN_COUNT,
          );
          this.setState({isDesktopView, grid});
        }
      }
    }
  }

  getInitialGrid = (
    rowCount = this.state.ROW_COUNT,
    colCount = this.state.COLUMN_COUNT,
  ) => {
    const initialGrid = [];
    for (let row = 0; row < rowCount; row++) {
      const currentRow = [];
      for (let col = 0; col < colCount; col++) {
        currentRow.push(this.createNode(row, col));
      }
      initialGrid.push(currentRow);
    }

    // Define walls here
    const walls = [
      {row: 0, col: 0},
      {row: 0, col: 1},
      {row: 0, col: 2},
      {row: 0, col: 3},
      {row: 0, col: 4},
      //{row: 0, col: 5},
      {row: 0, col: 6},
      {row: 0, col: 7},
      {row: 0, col: 8},
      {row: 0, col: 9},
      {row: 0, col: 10},
      {row: 0, col: 29},
      {row: 0, col: 30},
      {row: 0, col: 31},
      {row: 0, col: 32},
      {row: 0, col: 33},
      {row: 0, col: 34},
      {row: 0, col: 35},
      {row: 0, col: 36},
      {row: 0, col: 37},
      {row: 0, col: 38},
      {row: 0, col: 39},
      {row: 0, col: 40},
      {row: 0, col: 41},
      {row: 0, col: 42},
      {row: 0, col: 43},
      {row: 0, col: 44},
      {row: 0, col: 45},
      {row: 0, col: 46},
      {row: 0, col: 47},
      {row: 0, col: 48},
      {row: 0, col: 49},
      {row: 0, col: 50},
      {row: 0, col: 51},
      {row: 0, col: 52},
      {row: 0, col: 53},
      {row: 0, col: 54},
      {row: 0, col: 55},
      {row: 0, col: 56},
      {row: 0, col: 57},
      {row: 0, col: 58},
      {row: 0, col: 59},
      {row: 0, col: 60},
     

      {row: 1, col: 0},
      {row: 1, col: 1},
      {row: 1, col: 2},
      {row: 1, col: 3},
      {row: 1, col: 4},
      //{row: 1, col: 5},
      {row: 1, col: 6},
      {row: 1, col: 7},
      {row: 1, col: 8},
      {row: 1, col: 9},
      {row: 1, col: 10},
      {row: 1, col: 58},
      {row: 1, col: 59},
      {row: 1, col: 60},

      {row: 2, col: 0},
      {row: 2, col: 1},
      {row: 2, col: 2},
      {row: 2, col: 3},
      {row: 2, col: 4},
      //{row: 2, col: 5},
      {row: 2, col: 6},
      {row: 2, col: 7},
      {row: 2, col: 8},
      {row: 2, col: 9},
      {row: 2, col: 10},
      {row: 2, col: 13},
      {row: 2, col: 14},
      {row: 2, col: 15},
      {row: 2, col: 17},
      {row: 2, col: 18},
      {row: 2, col: 19},
      {row: 2, col: 20},
      {row: 2, col: 22},
      {row: 2, col: 23},
      {row: 2, col: 24},
      {row: 2, col: 25},
      {row: 2, col: 27},
      {row: 2, col: 58},
      {row: 2, col: 59},
      {row: 2, col: 60},
      


      {row: 3, col: 0},
      {row: 3, col: 1},
      {row: 3, col: 2},
      {row: 3, col: 3},
      {row: 3, col: 4},
      //{row: 3, col: 5},
      {row: 3, col: 6},
      {row: 3, col: 7},
      {row: 3, col: 8},
      {row: 3, col: 9},
      {row: 3, col: 10},
      {row: 3, col: 32},
      {row: 3, col: 33},
      {row: 3, col: 34},
      {row: 3, col: 35},
      {row: 3, col: 38},
      {row: 3, col: 40},
      {row: 3, col: 42},
      {row: 3, col: 43},
      {row: 3, col: 58},
      {row: 3, col: 59},
      {row: 3, col: 60},
      


      {row: 4, col: 0},
      {row: 4, col: 1},
      {row: 4, col: 2},
      {row: 4, col: 3},
      {row: 4, col: 4},
      //{row: 4, col: 5},
      {row: 4, col: 6},
      {row: 4, col: 7},
      {row: 4, col: 8},
      {row: 4, col: 9},
      {row: 4, col: 10},
      {row: 4, col: 12},
      {row: 4, col: 13},
      {row: 4, col: 17},
      {row: 4, col: 18},
      {row: 4, col: 19},
      {row: 4, col: 20},
      {row: 4, col: 22},
      {row: 4, col: 23},
      {row: 4, col: 24},
      {row: 4, col: 25},
      {row: 4, col: 27},
      {row: 4, col: 28},
      {row: 4, col: 29},
      {row: 4, col: 30},
      {row: 4, col: 34},
      {row: 4, col: 35},
      {row: 4, col: 36},
      {row: 4, col: 10},
      {row: 4, col: 30},
      //{row: 254 col: 31},
      {row: 4, col: 32},
      {row: 4, col: 32},
      // {row: 5, col: 33},
      {row: 4, col: 38},
      {row: 4, col: 39},
      {row: 4, col: 40},
      // {row: 5, col: 38},
      {row: 4, col: 56},
      {row: 4, col: 57},
      {row: 4, col: 54},
      {row: 4, col: 53},
      {row: 4, col: 52},
      {row: 4, col: 50},
      {row: 4, col: 49},
      {row: 4, col: 46},
      {row: 4, col: 47},
      {row: 4, col: 44},
      {row: 4, col: 43},
      {row: 4, col: 58},
      {row: 4, col: 59},
      {row: 4, col: 60},

      {row: 5, col: 0},
      {row: 5, col: 1},
      {row: 5, col: 2},
      {row: 5, col: 3},
      {row: 5, col: 4},
      //{row: 5, col: 5},
      {row: 5, col: 6},
      {row: 5, col: 7},
      {row: 5, col: 8},
      {row: 5, col: 9},
      {row: 5, col: 10},
      {row: 5, col: 12},
      {row: 5, col: 13},
      {row: 5, col: 14},
      {row: 5, col: 15},
      {row: 5, col: 17},
      {row: 5, col: 18},
      {row: 5, col: 19},
      {row: 5, col: 20},
      {row: 5, col: 22},
      {row: 5, col: 23},
      {row: 5, col: 24},
      {row: 5, col: 25},
      {row: 5, col: 27},
      {row: 5, col: 28},
      {row: 5, col: 29},
      {row: 5, col: 30},
      //{row: 254 col: 31},
      {row: 5, col: 32},
      {row: 5, col: 32},
      // {row: 5, col: 33},
      {row: 5, col: 38},
      {row: 5, col: 39},
      {row: 5, col: 40},
      // {row: 5, col: 38},
      {row: 5, col: 56},
      {row: 5, col: 57},
      {row: 5, col: 54},
      {row: 5, col: 53},
      {row: 5, col: 52},
      {row: 5, col: 50},
      {row: 5, col: 49},
      {row: 5, col: 46},
      {row: 5, col: 47},
      {row: 5, col: 44},
      {row: 5, col: 43},
      {row: 5, col: 58},
      {row: 5, col: 59},
      {row: 5, col: 60},


      {row: 6, col: 0},
      {row: 6, col: 1},
      {row: 6, col: 2},
      //{row: 6, col: 3},
      //{row: 6, col: 4},
      //{row: 6, col: 5},
      {row: 6, col: 6},
      {row: 6, col: 7},
      {row: 6, col: 8},
      {row: 6, col: 9},
      {row: 6, col: 10},
      {row: 6, col: 12},
      {row: 6, col: 13},
      {row: 6, col: 14},
      {row: 6, col: 15},
      {row: 6, col: 17},
      {row: 6, col: 18},
      {row: 6, col: 19},
      {row: 6, col: 20},
      {row: 6, col: 22},
      {row: 6, col: 23},
      {row: 6, col: 24},
      {row: 6, col: 25},
      {row: 6, col: 24},
      {row: 6, col: 25},
      {row: 6, col: 27},
      {row: 6, col: 28},
      {row: 6, col: 29},
      {row: 6, col: 30},
      //{row: 254 col: 31},
      {row: 6, col: 32},
      {row: 6, col: 33},
      {row: 6, col: 38},
      {row: 6, col: 39},
      {row: 6, col: 40},
      {row: 6, col: 38},
      {row: 6, col: 56},
      {row: 6, col: 57},
      {row: 6, col: 54},
      {row: 6, col: 53},
      {row: 6, col: 52},
      {row: 6, col: 50},
      {row: 6, col: 49},
      {row: 6, col: 46},
      {row: 6, col: 47},
      {row: 6, col: 44},
      {row: 6, col: 43},
      {row: 6, col: 58},
      {row: 6, col: 59},
      {row: 6, col: 60},
     

      


      {row: 7, col: 0},
      {row: 7, col: 1},
      {row: 7, col: 4},
      {row: 7, col: 58},
      {row: 7, col: 59},
      {row: 7, col: 60},
      
      
      //{row: 8, col: 0},
      //{row: 8, col: 1},
      //{row: 8, col: 2},
      {row: 8, col: 3},
      {row: 8, col: 4},
      //{row: 8, col: 5},
      {row: 8, col: 6},
      {row: 8, col: 7},
      {row: 8, col: 8},
      {row: 8, col: 9},
      {row: 8, col: 10},
      {row: 8, col: 12},
      {row: 8, col: 13},
      {row: 8, col: 14},
      {row: 8, col: 15},
      {row: 8, col: 17},
      {row: 8, col: 18},
      {row: 8, col: 19},
      {row: 8, col: 20},
      {row: 8, col: 22},
      {row: 8, col: 23},
      {row: 8, col: 24},
      {row: 8, col: 25},
      {row: 8, col: 21},
      {row: 8, col: 22},
      {row: 8, col: 23},
      {row: 8, col: 24},
      {row: 8, col: 25},
      {row: 8, col: 27},
      {row: 8, col: 28},
      {row: 8, col: 29},
      {row: 8, col: 30},
      //{row: 254 col: 31},
      {row: 8, col: 32},
      {row: 8, col: 33},
      {row: 8, col: 34},
      {row: 8, col: 35},
      {row: 8, col: 36},
      // {row: 8, col: 38},
      {row: 8, col: 56},
      {row: 8, col: 57},
      {row: 8, col: 54},
      {row: 8, col: 53},
      {row: 8, col: 52},
      {row: 8, col: 50},
      {row: 8, col: 49},
      {row: 8, col: 46},
      {row: 8, col: 47},
      {row: 8, col: 44},
      {row: 8, col: 43},
      {row: 8, col: 58},
      {row: 8, col: 59},
      {row: 8, col: 60},
      
     
       //{row: 9, col: 0},
      //{row: 9, col: 1},
      {row: 9, col: 2},
      {row: 9, col: 3},
      {row: 9, col: 4},
      //{row: 9, col: 5},
      {row: 9, col: 6},
      {row: 9, col: 7},
      {row: 9, col: 8},
      {row: 9, col: 9},
      {row: 9, col: 10},
      {row: 9, col: 12},
      {row: 9, col: 13},
      {row: 9, col: 14},
      {row: 9, col: 17},
      {row: 9, col: 18},
      {row: 9, col: 19},
      {row: 9, col: 20},
      {row: 9, col: 22},
      {row: 9, col: 23},
      {row: 9, col: 24},
      {row: 9, col: 25},
      {row: 9, col: 22},
      {row: 9, col: 23},
      {row: 9, col: 24},
      {row: 9, col: 25},
      {row: 9, col: 21},
      {row: 9, col: 22},
      {row: 9, col: 23},
      {row: 9, col: 24},
      {row: 9, col: 25},
      {row: 9, col: 27},
      {row: 9, col: 28},
      {row: 9, col: 29},
      {row: 9, col: 30},
      //{row: 254 col: 31},
      {row: 9, col: 32},
      {row: 9, col: 33},
      {row: 9, col: 34},
      {row: 9, col: 35},
      {row: 9, col: 36},
      {row: 9, col: 38},
      {row: 9, col: 56},
      {row: 9, col: 57},
      {row: 9, col: 54},
      {row: 9, col: 53},
      {row: 9, col: 52},
      {row: 9, col: 50},
      {row: 9, col: 49},
      {row: 9, col: 46},
      {row: 9, col: 47},
      {row: 9, col: 44},
      {row: 9, col: 43},
      {row: 9, col: 58},
      {row: 9, col: 59},
      {row: 9, col: 60},
      
      
     
     

       {row: 10, col: 0},
      //{row: 10, col: 1},
      {row: 10, col: 2},
      {row: 10, col: 3},
      {row: 10, col: 4},
      //{row: 10, col: 5},
      {row: 10, col: 6},
      {row: 10, col: 7},
      {row: 10, col: 8},
      {row: 10, col: 9},
      {row: 10, col: 10},
      {row: 10, col: 12},
      {row: 10, col: 13},
      {row: 10, col: 14},
      {row: 10, col: 17},
      {row: 10, col: 18},
      {row: 10, col: 19},
      {row: 10, col: 16},
      //{row: 10, col: 21},
      {row: 10, col: 22},
      {row: 10, col: 23},
      {row: 10, col: 24},
      {row: 10, col: 25},
      {row: 10, col: 21},
      {row: 10, col: 22},
      {row: 10, col: 23},
      {row: 10, col: 24},
      {row: 10, col: 25},
      {row: 10, col: 21},
      {row: 10, col: 22},
      {row: 10, col: 23},
      {row: 10, col: 24},
      {row: 10, col: 25},
      {row: 10, col: 21},
      {row: 10, col: 22},
      {row: 10, col: 23},
      {row: 10, col: 24},
      {row: 10, col: 25},
      {row: 10, col: 21},
      {row: 10, col: 22},
      {row: 10, col: 23},
      {row: 10, col: 24},
      {row: 10, col: 25},
      {row: 10, col: 27},
      {row: 10, col: 28},
      {row: 10, col: 29},
      {row: 10, col: 30},
      //{row: 254 col: 31},
      {row: 10, col: 32},
      {row: 10, col: 33},
      {row: 10, col: 34},
      {row: 10, col: 35},
      {row: 10, col: 36},
      {row: 10, col: 38},
      {row: 10, col: 39},
      {row: 10, col: 40},
      {row: 10, col: 56},
      {row: 10, col: 57},
      {row: 10, col: 53},
      {row: 10, col: 52},
      {row: 10, col: 58},
      {row: 10, col: 59},
      {row: 10, col: 60},
      
     

      {row: 11, col: 21},
      {row: 11, col: 22},
      {row: 11, col: 23},
      {row: 11, col: 24},
      {row: 11, col: 25},
      {row: 11, col: 21},
      {row: 11, col: 22},
      {row: 11, col: 23},
      {row: 11, col: 24},
      {row: 11, col: 25},
      {row: 11, col: 21},
      {row: 11, col: 22},
      {row: 11, col: 23},
      {row: 11, col: 24},
      {row: 11, col: 25},
      {row: 11, col: 21},
      {row: 11, col: 22},
      {row: 11, col: 23},
      {row: 11, col: 24},
      {row: 11, col: 25},
      {row: 11, col: 27},
      {row: 11, col: 28},
      {row: 11, col: 29},
      {row: 11, col: 30},
      //{row: 254 col: 31},
      {row: 11, col: 32},
      {row: 11, col: 33},
      {row: 11, col: 34},
      {row: 11, col: 35},
      {row: 11, col: 36},
      {row: 11, col: 38},
      {row: 11, col: 39},
      {row: 11, col: 40},
      {row: 11, col: 42},
      {row: 11, col: 55},
      {row: 11, col: 56},
      {row: 11, col: 49},
      {row: 11, col: 48},
      {row: 11, col: 46},
      {row: 11, col: 58},
      {row: 11, col: 59},
      {row: 11, col: 60},
      
      
      

       {row: 12, col: 0},
      //{row: 12, col: 1},
      {row: 12, col: 2},
      {row: 12, col: 3},
      //{row: 12, col: 4},
      {row: 12, col: 5},
      {row: 12, col: 6},
      {row: 12, col: 7},
      {row: 12, col: 8},
      {row: 12, col: 9},
      //{row: 12, col: 10},
      {row: 12, col: 13},
      {row: 12, col: 14},
      {row: 12, col: 12},
      {row: 12, col: 18},
      {row: 12, col: 17},
      {row: 12, col: 16},
      {row: 12, col: 21},
      {row: 12, col: 22},
      {row: 12, col: 23},
      {row: 12, col: 24},
      {row: 12, col: 25},
      {row: 12, col: 21},
      {row: 12, col: 22},
      {row: 12, col: 23},
      {row: 12, col: 24},
      {row: 12, col: 25},
      {row: 12, col: 21},
      {row: 12, col: 22},
      {row: 12, col: 23},
      {row: 12, col: 24},
      {row: 12, col: 25},
      {row: 12, col: 27},
      {row: 12, col: 28},
      {row: 12, col: 29},
      {row: 12, col: 30},
      //{row: 254 col: 31},
      {row: 12, col: 32},
      {row: 12, col: 33},
      {row: 12, col: 34},
      {row: 12, col: 35},
      {row: 12, col: 36},
      {row: 12, col: 38},
      {row: 12, col: 39},
      {row: 12, col: 40},
      {row: 12, col: 42},
      {row: 12, col: 43},
      {row: 12, col: 44},
      {row: 12, col: 57},
      {row: 12, col: 52},
      {row: 12, col: 51},
      {row: 12, col: 48},
      {row: 12, col: 58},
      {row: 12, col: 59},
      {row: 12, col: 60},
    
      

      {row: 13, col: 0},
      //{row: 13, col: 1},
      {row: 13, col: 2},
      {row: 13, col: 3},
      //{row: 13, col: 4},
      {row: 13, col: 5},
      {row: 13, col: 6},
      {row: 13, col: 7},
      {row: 13, col: 8},
      {row: 13, col: 9},
      //{row: 13, col: 10},
      {row: 13, col: 13},
      {row: 13, col: 14},
      {row: 13, col: 12},
      {row: 13, col: 17},
      {row: 13, col: 16},
      {row: 13, col: 18},
      {row: 13, col: 19},
      {row: 13, col: 21},
      {row: 13, col: 22},
      {row: 13, col: 23},
      {row: 13, col: 24},
      {row: 13, col: 25},
      {row: 13, col: 27},
      {row: 13, col: 28},
      {row: 13, col: 29},
      {row: 13, col: 30},
      //{row: 254 col: 31},
      {row: 13, col: 32},
      {row: 13, col: 33},
      {row: 13, col: 34},
      {row: 13, col: 35},
      {row: 13, col: 36},
      {row: 13, col: 38},
      {row: 13, col: 39},
      {row: 13, col: 40},
      {row: 13, col: 42},
      {row: 13, col: 43},
      {row: 13, col: 44},
      {row: 13, col: 45},
      {row: 13, col: 46},
      {row: 13, col: 57},
      //{row: 13, col: 53},
      {row: 13, col: 54},
      {row: 13, col: 50},
      {row: 13, col: 51},
      {row: 13, col: 58},
      {row: 13, col: 59},
      {row: 13, col: 60},

      {row: 14, col: 0},
      //{row: 14, col: 1},
      {row: 14, col: 2},
      {row: 14, col: 3},
      //{row: 14, col: 4},
      {row: 14, col: 5},
      {row: 14, col: 6},
      {row: 14, col: 7},
      {row: 14, col: 8},
      {row: 14, col: 9},
      //{row: 14, col: 10},
      {row: 14, col: 13},
      {row: 14, col: 14},
      {row: 14, col: 12},
      {row: 14, col: 18},
      {row: 14, col: 17},
      {row: 14, col: 16},
      {row: 14, col: 19},
      {row: 14, col: 21},
      {row: 14, col: 22},
      {row: 14, col: 23},
      {row: 14, col: 24},
      {row: 14, col: 25},
      {row: 14, col: 27},
      {row: 14, col: 28},
      {row: 14, col: 29},
      {row: 14, col: 30},
      //{row: 254 col: 31},
      {row: 14, col: 32},
      {row: 14, col: 33},
      {row: 14, col: 34},
      {row: 14, col: 35},
      {row: 14, col: 36},
      {row: 14, col: 38},
      {row: 14, col: 39},
      {row: 14, col: 40},
      {row: 14, col: 42},
      {row: 14, col: 43},
      {row: 14, col: 44},
      {row: 14, col: 45},
      {row: 14, col: 46},
      {row: 14, col: 47},
      {row: 14, col: 48},
      {row: 14, col: 56},
      {row: 14, col: 57},
      {row: 14, col: 58},
      {row: 14, col: 59},
      {row: 14, col: 60},

      {row: 15, col: 21},
      {row: 15, col: 22},
      {row: 15, col: 23},
      {row: 15, col: 24},
      {row: 15, col: 25},
      {row: 15, col: 27},
      {row: 15, col: 28},
      {row: 15, col: 29},
      {row: 15, col: 30},
      //{row: 254 col: 31},
      {row: 15, col: 32},
      {row: 15, col: 33},
      {row: 15, col: 34},
      {row: 15, col: 35},
      {row: 15, col: 36},
      {row: 15, col: 38},
      {row: 15, col: 39},
      {row: 15, col: 40},
      {row: 15, col: 42},
      {row: 15, col: 43},
      {row: 15, col: 44},
      {row: 15, col: 45},
      {row: 15, col: 46},
      {row: 15, col: 47},
      {row: 15, col: 48},
      {row: 15, col: 49},
      {row: 15, col: 50},
      {row: 15, col: 55},
      {row: 15, col: 56},
      {row: 15, col: 57},
      {row: 15, col: 52},
      {row: 15, col: 58},
      {row: 15, col: 59},
      {row: 15, col: 60},

      {row: 16, col: 0},
      {row: 16, col: 1},
      {row: 16, col: 2},
      {row: 16, col: 3},
      //{row: 16, col: 4},
      {row: 16, col: 5},
      {row: 16, col: 6},
      {row: 16, col: 7},
      {row: 16, col: 8},
      {row: 16, col: 9},
      //{row: 16, col: 10},
      {row: 16, col: 13},
      {row: 16, col: 14},
      {row: 16, col: 12},
      {row: 16, col: 17},
      {row: 16, col: 18},
      {row: 16, col: 19},
      {row: 16, col: 16},
      {row: 16, col: 58},
      {row: 16, col: 59},
      {row: 16, col: 60},

      {row: 17, col: 0},
      {row: 17, col: 1},
      {row: 17, col: 2},
      {row: 17, col: 3},
      //{row: 17, col: 4},
      {row: 17, col: 5},
      {row: 17, col: 6},
      {row: 17, col: 7},
      {row: 17, col: 8},
      {row: 17, col: 9},
      //{row: 17, col: 10},
      {row: 17, col: 13},
      {row: 17, col: 14},
      {row: 17, col: 12},
      {row: 17, col: 17},
      {row: 17, col: 18},
      {row: 17, col: 19},
      {row: 17, col: 16},
      {row: 17, col: 21},
      {row: 17, col: 22},
      {row: 17, col: 23},
      {row: 17, col: 24},
      {row: 17, col: 25},
      {row: 17, col: 27},
      {row: 17, col: 28},
      {row: 17, col: 29},
      {row: 17, col: 30},
      //{row: 254 col: 31},
      {row: 17, col: 32},
      {row: 17, col: 33},
      {row: 17, col: 34},
      {row: 17, col: 35},
      {row: 17, col: 36},
      {row: 17, col: 38},
      {row: 17, col: 39},
      {row: 17, col: 40},
      {row: 17, col: 42},
      {row: 17, col: 43},
      {row: 17, col: 44},
      {row: 17, col: 45},
      {row: 17, col: 46},
      {row: 17, col: 47},
      {row: 17, col: 48},
      {row: 17, col: 49},
      {row: 17, col: 50},
      {row: 17, col: 52},
      {row: 17, col: 53},
      {row: 17, col: 54},
      {row: 17, col: 55},
      {row: 17, col: 56},
      {row: 17, col: 57},
      {row: 17, col: 58},
      {row: 17, col: 59},
      {row: 17, col: 60},

      {row: 18, col: 0},
      {row: 18, col: 1},
      {row: 18, col: 2},
      {row: 18, col: 3},
      //{row: 18, col: 4},
      {row: 18, col: 5},
      {row: 18, col: 6},
      {row: 18, col: 7},
      {row: 18, col: 8},
      {row: 18, col: 9},
      //{row: 18, col: 10},
      {row: 18, col: 13},
      {row: 18, col: 14},
      {row: 18, col: 12},
      {row: 18, col: 17},
      {row: 18, col: 18},
      {row: 18, col: 19},
      {row: 18, col: 16},
      {row: 18, col: 21},
      {row: 18, col: 22},
      {row: 18, col: 23},
      {row: 18, col: 24},
      {row: 18, col: 25},
      {row: 18, col: 27},
      {row: 18, col: 28},
      {row: 18, col: 29},
      {row: 18, col: 30},
      //{row: 254 col: 31},
      {row: 18, col: 32},
      {row: 18, col: 33},
      {row: 18, col: 34},
      {row: 18, col: 35},
      {row: 18, col: 36},
      {row: 18, col: 38},
      {row: 18, col: 39},
      {row: 18, col: 40},
      {row: 18, col: 42},
      {row: 18, col: 43},
      {row: 18, col: 44},
      {row: 18, col: 45},
      {row: 18, col: 46},
      {row: 18, col: 47},
      {row: 18, col: 48},
      {row: 18, col: 49},
      {row: 18, col: 50},
      {row: 18, col: 52},
      {row: 18, col: 53},
      {row: 18, col: 54},
      {row: 18, col: 55},
      {row: 18, col: 56},
      {row: 18, col: 57},
      {row: 18, col: 58},
      {row: 18, col: 59},
      {row: 18, col: 60},

     
      {row: 19, col: 27},
      {row: 19, col: 28},
      {row: 19, col: 29},
      {row: 19, col: 30},
      {row: 19, col: 32},
      {row: 19, col: 33},
      {row: 19, col: 34},
      {row: 19, col: 35},
      {row: 19, col: 36},
      {row: 19, col: 38},
      {row: 19, col: 39},
      {row: 19, col: 40},
      {row: 19, col: 42},
      {row: 19, col: 43},
      {row: 19, col: 44},
      {row: 19, col: 45},
      {row: 19, col: 46},
      {row: 19, col: 47},
      {row: 19, col: 48},
      {row: 19, col: 49},
      {row: 19, col: 50},
      {row: 19, col: 52},
      {row: 19, col: 53},
      {row: 19, col: 54},
      {row: 19, col: 55},
      {row: 19, col: 56},
      {row: 19, col: 57},
      {row: 19, col: 58},
      {row: 19, col: 59},
      {row: 19, col: 60},
    

      {row: 20, col: 0},
      {row: 20, col: 1},
      {row: 20, col: 2},
      {row: 20, col: 3},
      //{row: 20, col: 4},
      //{row: 20, col: 5},
      {row: 20, col: 6},
      {row: 20, col: 7},
      {row: 20, col: 8},
      {row: 20, col: 9},
      //{row: 20, col: 10},
      {row: 20, col: 13},
      {row: 20, col: 14},
      {row: 20, col: 12},
      {row: 20, col: 18},
      {row: 20, col: 19},
      {row: 20, col: 16},
      {row: 20, col: 17},
      {row: 20, col: 21},
      {row: 20, col: 22},
      {row: 20, col: 23},
      {row: 20, col: 24},
      {row: 20, col: 25},
      {row: 20, col: 58},
      {row: 20, col: 59},
      {row: 20, col: 60},

      {row: 21, col: 0},
      {row: 21, col: 1},
      {row: 21, col: 2},
      {row: 21, col: 3},
      {row: 21, col: 4},
      //{row: 21, col: 5},
      {row: 21, col: 6},
      {row: 21, col: 7},
      {row: 21, col: 8},
      {row: 21, col: 9},
      //{row: 21, col: 10},
      {row: 21, col: 13},
      {row: 21, col: 14},
      {row: 21, col: 12},
      {row: 21, col: 18},
      {row: 21, col: 19},
      {row: 21, col: 16},
      {row: 21, col: 17},
      {row: 21, col: 21},
      {row: 21, col: 22},
      {row: 21, col: 23},
      {row: 21, col: 24},
      {row: 21, col: 25},
      {row: 21, col: 27},
      {row: 21, col: 28},
      {row: 21, col: 29},
      {row: 21, col: 30},
      //{row: 254 col: 31},
      {row: 21, col: 32},
      {row: 21, col: 33},
      {row: 21, col: 34},
      {row: 21, col: 35},
      {row: 21, col: 36},
      {row: 21, col: 38},
      {row: 21, col: 39},
      {row: 21, col: 40},
      {row: 21, col: 42},
      {row: 21, col: 43},
      {row: 21, col: 44},
      {row: 21, col: 45},
      {row: 21, col: 46},
      {row: 21, col: 47},
      {row: 21, col: 48},
      {row: 21, col: 49},
      {row: 21, col: 50},
      {row: 21, col: 52},
      {row: 21, col: 53},
      {row: 21, col: 54},
      {row: 21, col: 55},
      {row: 21, col: 56},
      {row: 21, col: 57},
      {row: 21, col: 19},
      {row: 21, col: 58},
      {row: 21, col: 59},
      {row: 21, col: 60},

      {row: 22, col: 0},
      {row: 22, col: 1},
      {row: 22, col: 2},
      {row: 22, col: 3},
      {row: 22, col: 4},
      //{row: 22, col: 5},
      //{row: 22, col: 6},
      {row: 22, col: 7},
      {row: 22, col: 8},
      {row: 22, col: 9},
      //{row: 22, col: 10},
      {row: 22, col: 13},
      {row: 22, col: 14},
      {row: 22, col: 12},
      {row: 22, col: 18},
      {row: 22, col: 19},
      {row: 22, col: 16},
      {row: 22, col: 17},
      {row: 22, col: 21},
      {row: 22, col: 22},
      {row: 22, col: 23},
      {row: 22, col: 24},
      {row: 22, col: 25},
      {row: 22, col: 27},
      {row: 22, col: 28},
      {row: 22, col: 29},
      {row: 22, col: 30},
      //{row: 254 col: 31},
      {row: 22, col: 32},
      {row: 22, col: 33},
      {row: 22, col: 34},
      {row: 22, col: 35},
      {row: 22, col: 36},
      {row: 22, col: 38},
      {row: 22, col: 39},
      {row: 22, col: 40},
      {row: 22, col: 42},
      {row: 22, col: 43},
      {row: 22, col: 44},
      {row: 22, col: 45},
      {row: 22, col: 46},
      {row: 22, col: 47},
      {row: 22, col: 48},
      {row: 22, col: 49},
      {row: 22, col: 50},
      {row: 22, col: 52},
      {row: 22, col: 53},
      {row: 22, col: 54},
      {row: 22, col: 55},
      {row: 22, col: 56},
      {row: 22, col: 57},
      {row: 22, col: 19},
      {row: 22, col: 58},
      {row: 22, col: 59},
      {row: 22, col: 60},

      {row: 23, col: 0},
      {row: 23, col: 1},
      {row: 23, col: 2},
      {row: 23, col: 3},
      {row: 23, col: 4},
      {row: 23, col: 21},
      {row: 23, col: 22},
      {row: 23, col: 23},
      {row: 23, col: 24},
      {row: 23, col: 25},
      {row: 23, col: 58},
      {row: 23, col: 59},
      {row: 23, col: 60},
      

      {row: 24, col: 0},
      {row: 24, col: 1},
      {row: 24, col: 2},
      {row: 24, col: 3},
      {row: 24, col: 4},
      {row: 24, col: 5},
      {row: 24, col: 6},
      {row: 24, col: 13},
      {row: 24, col: 14},
      {row: 24, col: 12},
      {row: 24, col: 17},
      {row: 24, col: 18},
      {row: 24, col: 19},
      {row: 24, col: 16},
      {row: 24, col: 21},
      {row: 24, col: 22},
      {row: 24, col: 23},
      {row: 24, col: 24},
      {row: 24, col: 25},
      {row: 24, col: 27},
      {row: 24, col: 28},
      {row: 24, col: 29},
      {row: 24, col: 30},
      //{row: 254 col: 31},
      {row: 24, col: 32},
      {row: 24, col: 33},
      {row: 24, col: 34},
      {row: 24, col: 35},
      {row: 24, col: 36},
      {row: 24, col: 38},
      {row: 24, col: 39},
      {row: 24, col: 40},
      {row: 24, col: 42},
      {row: 24, col: 43},
      {row: 24, col: 44},
      {row: 24, col: 45},
      {row: 24, col: 46},
      {row: 24, col: 47},
      {row: 24, col: 48},
      {row: 24, col: 49},
      {row: 24, col: 50},
      {row: 24, col: 52},
      {row: 24, col: 53},
      {row: 24, col: 54},
      {row: 24, col: 55},
      {row: 24, col: 56},
      {row: 24, col: 57},
      {row: 24, col: 19},
      {row: 24, col: 58},
      {row: 24, col: 59},
      {row: 24, col: 60},

      {row: 25, col: 0},
      {row: 25, col: 1},
      {row: 25, col: 2},
      {row: 25, col: 3},
      {row: 25, col: 4},
      {row: 25, col: 5},
      {row: 25, col: 6},
      {row: 25, col: 13},
      {row: 25, col: 14},
      {row: 25, col: 12},
      {row: 25, col: 17},
      {row: 25, col: 18},
      {row: 25, col: 19},
      {row: 25, col: 16},
      {row: 25, col: 21},
      {row: 25, col: 22},
      {row: 25, col: 23},
      {row: 25, col: 24},
      {row: 25, col: 25},
      {row: 25, col: 27},
      {row: 25, col: 28},
      {row: 25, col: 29},
      {row: 25, col: 30},
      //{row: 25, col: 31},
      {row: 25, col: 32},
      {row: 25, col: 33},
      {row: 25, col: 34},
      {row: 25, col: 35},
      {row: 25, col: 36},
      {row: 25, col: 38},
      {row: 25, col: 39},
      {row: 25, col: 40},
      {row: 25, col: 42},
      {row: 25, col: 43},
      {row: 25, col: 44},
      {row: 25, col: 45},
      {row: 25, col: 46},
      {row: 25, col: 47},
      {row: 25, col: 48},
      {row: 25, col: 49},
      {row: 25, col: 50},
      {row: 25, col: 52},
      {row: 25, col: 53},
      {row: 25, col: 54},
      {row: 25, col: 55},
      {row: 25, col: 56},
      {row: 25, col: 57},
      {row: 25, col: 19},
      {row: 25, col: 58},
      {row: 25, col: 59},
      {row: 25, col: 60},
      


      {row: 26, col: 0},
      {row: 26, col: 1},
      {row: 26, col: 2},
      {row: 26, col: 3},
      {row: 26, col: 4},
      {row: 26, col: 5},
      {row: 26, col: 6},
      {row: 26, col: 7},
      {row: 26, col: 8},
      {row: 26, col: 9},
      {row: 26, col: 10},
      {row: 26, col: 11},
      {row: 26, col: 58},
      {row: 26, col: 59},
      {row: 26, col: 60},
      {row: 26, col: 13},
      {row: 26, col: 14},
      {row: 26, col: 15},
      {row: 26, col: 12},
      {row: 26, col: 17},
      {row: 26, col: 18},
      {row: 26, col: 19},
      {row: 26, col: 20},
      {row: 26, col: 16},
      {row: 26, col: 21},
      {row: 26, col: 22},
      {row: 26, col: 23},
      {row: 26, col: 24},
      {row: 26, col: 25},
      {row: 26, col: 26},
      {row: 26, col: 27},
      {row: 26, col: 28},
      {row: 26, col: 29},
      {row: 26, col: 30},
      {row: 26, col: 31},
      {row: 26, col: 32},
      {row: 26, col: 33},
      {row: 26, col: 34},
      {row: 26, col: 35},
      {row: 26, col: 36},
      {row: 26, col: 37},
      {row: 26, col: 38},
      {row: 26, col: 39},
      {row: 26, col: 40},
      {row: 26, col: 41},
      {row: 26, col: 42},
      {row: 26, col: 43},
      {row: 26, col: 44},
      {row: 26, col: 45},
      {row: 26, col: 46},
      {row: 26, col: 47},
      {row: 26, col: 48},
      {row: 26, col: 49},
      {row: 26, col: 50},
      {row: 26, col: 51},
      {row: 26, col: 52},
      {row: 26, col: 53},
      {row: 26, col: 54},
      {row: 26, col: 55},
      {row: 26, col: 56},
      {row: 26, col: 57},
      {row: 26, col: 19},
     

      {row: 27, col: 0},
      {row: 27, col: 1},
      {row: 27, col: 2},
      {row: 27, col: 3},
      {row: 27, col: 4},
      {row: 27, col: 5},
      {row: 27, col: 6},
      {row: 27, col: 7},
      {row: 27, col: 8},
      {row: 27, col: 9},
      {row: 27, col: 10},
      {row: 27, col: 11},
      {row: 27, col: 58},
      {row: 27, col: 59},
      {row: 27, col: 60},
      {row: 27, col: 13},
      {row: 27, col: 14},
      {row: 27, col: 15},
      {row: 27, col: 12},
      {row: 27, col: 17},
      {row: 27, col: 18},
      {row: 27, col: 19},
      {row: 27, col: 20},
      {row: 27, col: 16},
      {row: 27, col: 21},
      {row: 27, col: 22},
      {row: 27, col: 23},
      {row: 27, col: 24},
      {row: 27, col: 25},
      {row: 27, col: 26},
      {row: 27, col: 27},
      {row: 27, col: 28},
      {row: 27, col: 29},
      {row: 27, col: 30},
      {row: 27, col: 31},
      {row: 27, col: 32},
      {row: 27, col: 33},
      {row: 27, col: 34},
      {row: 27, col: 35},
      {row: 27, col: 36},
      {row: 27, col: 37},
      {row: 27, col: 38},
      {row: 27, col: 39},
      {row: 27, col: 40},
      {row: 27, col: 41},
      {row: 27, col: 42},
      {row: 27, col: 43},
      {row: 27, col: 44},
      {row: 27, col: 45},
      {row: 27, col: 46},
      {row: 27, col: 47},
      {row: 27, col: 48},
      {row: 27, col: 49},
      {row: 27, col: 50},
      {row: 27, col: 51},
      {row: 27, col: 52},
      {row: 27, col: 53},
      {row: 27, col: 54},
      {row: 27, col: 55},
      {row: 27, col: 56},
      {row: 27, col: 57},
      {row: 27, col: 19},
      

    ];

    for (const wall of walls) {
      initialGrid[wall.row][wall.col].isWall = true;
    }

    return initialGrid;
  };

  createNode = (row, col) => {
    return {
      row,
      col,
      isStart:
        row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
      isFinish:
        row === this.state.FINISH_NODE_ROW &&
        col === this.state.FINISH_NODE_COL,
      distance: Infinity,
      distanceToFinishNode:
        Math.abs(this.state.FINISH_NODE_ROW - row) +
        Math.abs(this.state.FINISH_NODE_COL - col),
      isVisited: false,
      isWall: false,
      previousNode: null,
      isNode: true,
    };
  };


  // /******************** Set up the initial grid ********************/
  // getInitialGrid = (
  //   rowCount = this.state.ROW_COUNT,
  //   colCount = this.state.COLUMN_COUNT,
  // ) => {
  //   const initialGrid = [];
  //   for (let row = 0; row < rowCount; row++) {
  //     const currentRow = [];
  //     for (let col = 0; col < colCount; col++) {
  //       currentRow.push(this.createNode(row, col));
  //     }
  //     initialGrid.push(currentRow);
  //   }
  //   return initialGrid;
  // };

  // createNode = (row, col) => {
  //   return {
  //     row,
  //     col,
  //     isStart:
  //       row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
  //     isFinish:
  //       row === this.state.FINISH_NODE_ROW &&
  //       col === this.state.FINISH_NODE_COL,
  //     distance: Infinity,
  //     distanceToFinishNode:
  //       Math.abs(this.state.FINISH_NODE_ROW - row) +
  //       Math.abs(this.state.FINISH_NODE_COL - col),
  //     isVisited: false,
  //     isWall: false,
  //     previousNode: null,
  //     isNode: true,
  //   };
  // };

  

  /******************** Control mouse events ********************/
  handleMouseDown(row, col) {
    if (!this.state.isRunning) {
      if (this.isGridClear()) {
        if (
          document.getElementById(`node-${row}-${col}`).className ===
          'node node-start'
        ) {
          this.setState({
            mouseIsPressed: true,
            isStartNode: true,
            currRow: row,
            currCol: col,
          });
        } else if (
          document.getElementById(`node-${row}-${col}`).className ===
          'node node-finish'
        ) {
          this.setState({
            mouseIsPressed: true,
            isFinishNode: true,
            currRow: row,
            currCol: col,
          });
        }
      } else {
        this.clearGrid();
      }
    }
  }

  isGridClear() {
    for (const row of this.state.grid) {
      for (const node of row) {
        const nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`,
        ).className;
        if (
          nodeClassName === 'node node-visited' ||
          nodeClassName === 'node node-shortest-path'
        ) {
          return false;
        }
      }
    }
    return true;
  }

  handleMouseEnter(row, col) {
    if (!this.state.isRunning && this.state.mouseIsPressed) {
      const nodeClassName = document.getElementById(`node-${row}-${col}`)
        .className;
      if (this.state.isStartNode) {
        if (nodeClassName !== 'node node-wall') {
          const prevStartNode = this.state.grid[this.state.currRow][
            this.state.currCol
          ];
          prevStartNode.isStart = false;
          document.getElementById(
            `node-${this.state.currRow}-${this.state.currCol}`,
          ).className = 'node';

          this.setState({currRow: row, currCol: col});
          const currStartNode = this.state.grid[row][col];
          currStartNode.isStart = true;
          document.getElementById(`node-${row}-${col}`).className =
            'node node-start';
        }
        this.setState({START_NODE_ROW: row, START_NODE_COL: col});
      } else if (this.state.isFinishNode) {
        if (nodeClassName !== 'node node-wall') {
          const prevFinishNode = this.state.grid[this.state.currRow][
            this.state.currCol
          ];
          prevFinishNode.isFinish = false;
          document.getElementById(
            `node-${this.state.currRow}-${this.state.currCol}`,
          ).className = 'node';

          this.setState({currRow: row, currCol: col});
          const currFinishNode = this.state.grid[row][col];
          currFinishNode.isFinish = true;
          document.getElementById(`node-${row}-${col}`).className =
            'node node-finish';
        }
        this.setState({FINISH_NODE_ROW: row, FINISH_NODE_COL: col});
      }
    }
  }

  handleMouseUp(row, col) {
    if (!this.state.isRunning) {
      this.setState({mouseIsPressed: false});
      if (this.state.isStartNode) {
        const isStartNode = !this.state.isStartNode;
        this.setState({isStartNode, START_NODE_ROW: row, START_NODE_COL: col});
      } else if (this.state.isFinishNode) {
        const isFinishNode = !this.state.isFinishNode;
        this.setState({
          isFinishNode,
          FINISH_NODE_ROW: row,
          FINISH_NODE_COL: col,
        });
      }
      this.getInitialGrid();
    }
  }

  handleMouseLeave() {
    if (this.state.isStartNode) {
      const isStartNode = !this.state.isStartNode;
      this.setState({isStartNode, mouseIsPressed: false});
    } else if (this.state.isFinishNode) {
      const isFinishNode = !this.state.isFinishNode;
      this.setState({isFinishNode, mouseIsPressed: false});
    }
  }


  /******************** Clear the board, walls, or path ********************/
  clearGrid() {
    if (!this.state.isRunning) {
      const newGrid = this.state.grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          const nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`,
          ).className;
          if (
            nodeClassName !== 'node node-start' &&
            nodeClassName !== 'node node-finish' &&
            nodeClassName !== 'node node-wall'
          ) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node';
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(this.state.FINISH_NODE_ROW - node.row) +
              Math.abs(this.state.FINISH_NODE_COL - node.col);
          }
          if (nodeClassName === 'node node-finish') {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode = 0;
          }
          if (nodeClassName === 'node node-start') {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(this.state.FINISH_NODE_ROW - node.row) +
              Math.abs(this.state.FINISH_NODE_COL - node.col);
            node.isStart = true;
            node.isWall = false;
            node.previousNode = null;
            node.isNode = true;
          }
        }
      }
      this.setState({grid: newGrid});
    }
  }

  // clearWalls() {
  //   if (!this.state.isRunning) {
  //     const newGrid = this.state.grid.slice();
  //     for (const row of newGrid) {
  //       for (const node of row) {
  //         if (node.isWall) {
  //           document.getElementById(`node-${node.row}-${node.col}`).className =
  //             'node';
  //           node.isWall = false;
  //         }
  //       }
  //     }
  //     this.setState({grid: newGrid});
  //   }
  // }

  /******************** Visualize the algorithms ********************/
  visualize(algo) {
    if (!this.state.isRunning) {
      this.clearGrid();
      this.toggleIsRunning();
      const {grid} = this.state;
      const startNode =
        grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
      const finishNode =
        grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
      let visitedNodesInOrder;
      switch (algo) {
        case 'Dijkstra':
          visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
          break;
        case 'AStar':
          visitedNodesInOrder = AStar(grid, startNode, finishNode);
          break;
        case 'DFS':
          visitedNodesInOrder = dfs(grid, startNode, finishNode);
          break;
        case 'BFS':
          visitedNodesInOrder = bfs(grid, startNode, finishNode);
          break;
        case 'BellmanFord': // Add Bellman-Ford case
          visitedNodesInOrder = bellmanFord(grid, startNode, finishNode);
          break;
        default:
          visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
          break;
      }
      const nodesInShortestPathOrder = this.getNodesInShortestPathOrder(
        finishNode,
      );
      this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (
          !(
            document.getElementById(`node-${node.row}-${node.col}`).className ===
              'node node-start' ||
            document.getElementById(`node-${node.row}-${node.col}`).className ===
              'node node-finish'
          )
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (
          !(
            document.getElementById(`node-${node.row}-${node.col}`).className ===
              'node node-start' ||
            document.getElementById(`node-${node.row}-${node.col}`).className ===
              'node node-finish'
          )
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
        }
      }, 50 * i);
    }
    this.toggleIsRunning();
  }

  /******************** Get the nodes in the shortest path order ********************/
  getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <div className="full-visualizer">
        <div className="navbar">
          <div className="navbar-brand bg-slate-600 text-white font-bold py-3">
            Pathfinding Visualizer
          </div>
          <div className="algorithm-buttons">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => this.visualize('Dijkstra')}>Dijkstra</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"  onClick={() => this.visualize('AStar')}>A*</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"   onClick={() => this.visualize('DFS')}>DFS</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"   onClick={() => this.visualize('BFS')}>BFS</button>
            <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"  onClick={() => this.visualize('BellmanFord')}>Bellman-Ford</button> {/* Add Bellman-Ford button */}
          </div>
          <div className="control-buttons">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"  onClick={() => this.clearGrid()}>Clear Grid</button>
            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"  onClick={() => this.clearWalls()}>Clear Walls</button> */}
          </div>
        </div>
        <div className='line'>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="row">
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) =>
                        this.handleMouseDown(row, col)
                      }
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp(row, col)}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
       
      </div>
      </div>
    );
  }
}

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

// Backtracks from the finishNode to find the shortest path.
// Only works when called after the pathfinding methods.
function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}