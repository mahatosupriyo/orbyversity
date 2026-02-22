import Icon from "@/components/atoms/icon";
import styles from "./home.module.scss";
import NumberFlow from '@number-flow/react'

import Tooltip from "@/components/atoms/tooltip/tooltip";

export default function Home() {
  return (
    <div className={styles.wraper}>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <img src="/Logo.svg" draggable="false" alt="Logo" style={{ userSelect: 'none', pointerEvents: 'none' }} />
        </nav>


        <div className={styles.content}>


          <div className={styles.topstatus}>

            <Tooltip direction="bottom" content="see more">

              <div className={styles.card}>
                <p className={styles.label}>
                  Scholar
                </p>

                <div className={styles.subwraper}>

                  <div className={styles.metrics}>
                    <h4 className={styles.sublabel}>
                      Last 7 days
                    </h4>

                    <div className={styles.status}>
                      <Icon name="uparrow" fill="#0C9E00" size={16} />
                      <span className={styles.statusdata}>
                        <NumberFlow value={0.3} />%
                      </span>
                    </div>
                  </div>

                  <div className={styles.value}>
                    <span className={styles.activetotal}>
                      1,200
                    </span>
                    <h4 className={styles.subvalue}>
                      /
                    </h4>
                    <span className={styles.totalvalue}>1,500</span>
                  </div>

                </div>
              </div>

            </Tooltip>


            <Tooltip direction="bottom" content="see more">


              <div className={styles.card}>
                <p className={styles.label}>
                  Educator
                </p>

                <div className={styles.subwraper}>

                  <div className={styles.metrics}>
                    <h4 className={styles.sublabel}>
                      Last 7 days
                    </h4>

                    <div className={styles.status}>
                      <Icon name="uparrow" fill="#0C9E00" size={16} />
                      <span className={styles.statusdata}>
                        0.3%
                      </span>
                    </div>
                  </div>

                  <div className={styles.value}>
                    <span className={styles.activetotal}>
                      1,200
                    </span>
                    <h4 className={styles.subvalue}>
                      /
                    </h4>
                    <span className={styles.totalvalue}>1,500</span>
                  </div>

                </div>
              </div>

            </Tooltip>


            <Tooltip direction="bottom" content="see more">


              <div className={styles.card}>
                <p className={styles.label}>
                  MANAGEMENT
                </p>

                <div className={styles.subwraper}>

                  <div className={styles.metrics}>
                    <h4 className={styles.sublabel}>
                      Last 7 days
                    </h4>

                    <div className={styles.status}>
                      <Icon name="downarrow" fill="#9E0000" size={16} />
                      <span className={styles.statusdatadown}>
                        0.3%
                      </span>
                    </div>
                  </div>

                  <div className={styles.value}>
                    <span className={styles.activetotal}>
                      120
                    </span>
                    <h4 className={styles.subvalue}>
                      /
                    </h4>
                    <span className={styles.totalvalue}>150</span>
                  </div>

                </div>
              </div>

            </Tooltip>

          </div>

        </div>
      </div>
    </div>
  );
}
