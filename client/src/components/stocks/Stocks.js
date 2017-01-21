import React, { Component } from 'react';
import Stock from '../single-stock/stock';
import './Stocks.css';

class Stocks extends Component {
  removeStock(id) {
    fetch(`/stock/remove?remove=${id}`, {
    	method: 'delete'
    }).then(response => {
      // throw error if status is not 200
      if(response.status !== 200)
        throw new Error("/stock/remove request not successful");
      // hide element that has to be removed in fancy way
      const newState = this.props.stocks.map(elem => {
        if(elem.id === id) {
          elem.hide = true;
        }
        return elem;
      });
      this.props.changeParentState(newState, null);
      return response;
    }).then(data => {
      // filter out the element that has to be removed
      const newState = this.props.stocks.filter(elem => {
        return (elem.id !== id);
      });
      setTimeout(()=> {
        this.props.changeParentState(newState, null);
      }, 800);
    }).catch(err => {
    	console.error("Error happened while making /stock/remove req:", err);
    });
  }

  removeAllStock() {
    fetch(`/stock/removeAll`, {
    	method: 'delete'
    }).then(response => {
      // throw error if status is not 200
      if(response.status !== 200)
        throw new Error("/stock/remove request not successful");
      // hide element that has to be removed in fancy way
      const newState = this.props.stocks.map(elem => {
        elem.hide = true;
        return elem;
      });
      this.props.changeParentState(newState, null);
      return response;
    }).then(data => {
      // filter out the element that has to be removed
      const newState = [];
      setTimeout(()=> {
        this.props.changeParentState(newState, null);
      }, 800);
    }).catch(err => {
    	console.error("Error happened while making /stock/removeAll req:", err);
    });
  }

  getCurrentStocks() {
    let stocks = this.props.stocks.map((stock, i) => {
      // make sure key is different for each of Stock element
      return (
        <Stock
          key={stock.id}
          code={stock.code}
          description={stock.description}
          removeStock={this.removeStock.bind(this)}
          stockId={stock.id}
          hide={stock.hide}
        />
      );
    });
    return stocks;
  }

  render() {
    const stocks = this.getCurrentStocks();;
    return (
      <div id="stocks" className={this.props.classes}>
        {stocks}
      </div>
    );
  }
}

export default Stocks;
