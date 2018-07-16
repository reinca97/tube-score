import React, { Component } from 'react';

/* global chrome */
class Result extends Component {

  render() {
    let linkUrl="";
    return (
      <div className="result-list">

        {
          this.props.dataItems&&
          this.props.dataItems.map( (item,index)=>{
          linkUrl=String(item.link);

          return(
            <div className="result-entry">

              <span
                className={`star ${item.isFavorite}`}
                onClick={()=>this.props.starLighting(index)}
              >
                &#9733;
              </span>

              <a href={linkUrl}  target="_blank" >
                {`${index+1}. ${item.title}`}
              </a>

            </div>
            )
          }
        )}


        <span
          className="view-more"
          onClick={this.props.viewMore}
        >
          view more
        </span>

      </div>



    );
  }
}

export default Result;