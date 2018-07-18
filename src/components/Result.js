import React, { Component } from 'react';
import ResultEntry from './ResultEntry'

/* global chrome */
class Result extends Component {

  render() {

    return (
      <div className="result-list">
        {this.props.dataItems==="no-result"?
          (
            <div className="no-result-entry">
              검색 결과가 없습니다.
            </div>
          ):(
            <div>
              {this.props.dataItems&&
              this.props.dataItems.map( (item,index)=>{
                return(
                  <ResultEntry
                    starLighting={this.props.starLighting}
                    item={item}
                    index={index}
                    linkUrl={String(item.link)}
                  />
                )

              })

              }

              {this.props.dataItems&&
              <span className="view-more" onClick={this.props.viewMore} >
                view more
              </span>
              }


            </div>
          )
        }
      </div>
    );
  }
}

export default Result;