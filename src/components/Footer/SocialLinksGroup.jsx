import React from "react";

const SocialLinksGroup = () => {
    return (<React.Fragment>
                    <div className="social  text-light">
              <h5 className="footer-social__title text-left">
                Подписывайтесь на нас
              </h5>
              <div className="footer-social__icons-group">
                <a className="icon_link icon-bottom" href="#youtube">
                    <i className="fa fa-youtube-play fa-2x" aria-hidden="true"></i>
                </a>
                <a className="icon_link " href="#linkedin">
                <i className="fa fa-linkedin fa-2x " aria-hidden="true"></i>
                </a>
                <a className="icon_link" href="#google">
                <i className="fa fa-google-plus fa-2x" aria-hidden="true"></i>
                </a>
                <a className="icon_link" href="#facebook">
                <i className="fa fa-facebook fa-2x" aria-hidden="true"></i>
                </a>
                <a className="icon_link" href="#twitter">
                <i className="fa fa-twitter fa-2x" aria-hidden="true"></i>
                </a>

              </div>
            </div>
    </React.Fragment>)
}

export default SocialLinksGroup;