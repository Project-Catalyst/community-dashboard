import ProgressBar from 'react-bootstrap/ProgressBar';
import Slider from '@mui/material/Slider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { height } from '@mui/system';

function ChallengesChart(props) {
    const [thumbPosition, setThumbPosition] = useState(0);

    const [animation, setAnimation] = useState(props.challenges.fundsData);

    const handleSliderChange = (_, newValue) => {
        setThumbPosition(newValue);
    };
    const colorsR = ["#240000", "#790909", "#5e363f", "#446275", "#2891ae", "#10b9de", "#00d4ff"]
    const colors = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"]
    return (
        <div className='container border mt-5'>
            <style type="text/css">
                {`
                        .bg-first {
                            background-color: #240000;
                        }
                        .bg-second {
                            background-color: #790909;
                        }
                        .bg-third {
                            background-color: #5e363f;
                        }
                        .bg-fourth {
                            background-color: #446275;
                        }
                        .bg-fifth {
                            background-color: #2891ae;
                        }
                        .bg-sixth {
                            background-color: #10b9de;
                        }
                        .bg-seventh {
                            background-color: #00d4ff;
                        }
                        .content {
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            -webkit-transform: translate(-50%, -50%);
                            transform: translate(-50%, -50%);
                        }
                    `}
            </style>
            <div className="row justify-content-center mt-5">
                <h3 align="center" className="col-md-7 mb-5" > PA progress by challenges *Fund9 </h3>

                <div className="col-md-10">
                    <Row>
                        <div className="col-md-4 mb-3" style={{ fontWeight: "bold" }}>Challenge name</div>
                        <div className="col-md-6 mb-3" style={{ fontWeight: "bold" }}>Assessments done per challenge</div>
                        <div className="col-md-2 mb-3" style={{ fontWeight: "bold" }}>Total proposals</div>
                    </Row>
                    {
                        animation[thumbPosition].datasets.map((dataset, index) => {
                            return <Row key={index}>
                                <div className="col-md-4">{animation[thumbPosition].names[index]}</div>
                                <div className="col-md-6">
                                    <ProgressBar className='m-1' key={index}>
                                        {
                                            dataset.map((item, index) => {
                                                return <ProgressBar variant={colors[index]} now={item} key={index} label={item} />
                                            })
                                        }
                                    </ProgressBar>
                                </div>
                                <div className="col-md-2">{dataset.reduce((x, acc) => acc += x, 0)}</div>
                            </Row>
                        })
                    }
                    <div label="legend" className='col-md-4 border p-2 mt-5'>
                        <Row>
                            <div className='p-2' style={{ fontWeight: "bold" }}>Legend:</div>
                        </Row>
                        {

                            colors.map((dataset, index) => {
                                return <Row>
                                    <div className="col-md-8"> {index < 6 ? `${index + 1}` : `${index + 1}+`}  {index == 0 ? `assessment` : `assessments`} </div><div className="col-md-2  mb-3" style={{ width: 20, height: 10, backgroundColor: colorsR[index] }}></div>
                                </Row>
                            })
                        }
                    </div>
                </div>
                <div className="col-md-7 mb-5">
                    <div className="row">
                        <div className='col-md-2 text-center my-auto' style={{ fontWeight: "bold" }}>Beginning</div>

                        <div className="col-md-6 m-5 ">
                            <Slider
                                aria-label="chartDataSlider"
                                defaultValue={0}
                                valueLabelDisplay="off"
                                onChange={handleSliderChange}
                                step={1}
                                min={0}
                                marks
                                max={animation.length - 1}
                            />
                        </div>
                        <div className='col-md-2 my-auto' style={{ fontWeight: "bold" }}>Recent</div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ChallengesChart