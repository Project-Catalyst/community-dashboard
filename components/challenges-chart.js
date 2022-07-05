import ProgressBar from 'react-bootstrap/ProgressBar';
import Slider from '@mui/material/Slider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

function ChallengesChart(props) {
    const [thumbPosition, setThumbPosition] = useState(0);

    const [animation, setAnimation] = useState(props.challenges.fundsData);

    const handleSliderChange = (_, newValue) => {
        setThumbPosition(newValue);
    };
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
                    `}
            </style>
            <div className="row justify-content-center mt-5">
                <h3 align="center" className="col-md-7 mb-5" > PA progress by challenges *Fund9 </h3>
                <div className="col-md-10">
                    {
                        animation[thumbPosition].datasets.map((dataset, index) => {
                            return <Row key={index}>
                                <div className="col-md-4">{animation[thumbPosition].names[index]}</div>
                                <div className="col-md-8">
                                    <ProgressBar className='m-1' key={index}>
                                        {
                                            dataset.map((item, index) => {
                                                return <ProgressBar variant={colors[index]} now={item} key={index} label={item} />
                                            })
                                        }
                                    </ProgressBar>
                                </div>
                            </Row>
                        })
                    }
                </div>
                <div className="col-md-8 m-5">
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
            </div>
        </div>
    )
}

export default ChallengesChart