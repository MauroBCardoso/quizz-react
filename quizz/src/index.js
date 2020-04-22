import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";
import NextLvl from "./components/NextLevel";
import Won from "./components/Won";

class Quizz extends Component {
    state = {
        questionBank: [],
        score : 0,
        responses : 0,
        level : 1
    };
    getQuestions = () =>{
        quizService().then(question => {
            this.setState({
                questionBank: question
            });
        });
    };

    nextLvl = () =>{
        this.getQuestions();
        this.setState({
            score : 0,
            responses : 0,
            level : this.state.level + 1
        })
    }

    playAgain = () =>{
        this.getQuestions();
        this.setState({
            score : 0,
            responses : 0,
            level : 1
        })
    }

    computeAnswer = (answer, correctAnswer) => {
        if (answer === correctAnswer) {
            this.setState({
                score: this.state.score +1
            });
        }
        this.setState({
           responses: this.state.responses < 5 ? this.state.responses + 1 : 5})
    }

    componentDidMount(){
        this.getQuestions();
    }
    render(){
        return (
            <div className = "container">
                {this.state.level === 1 ? 
                (<div className = "title">Quizz (Get {this.state.level} correct answer for the next level)</div>)
                :<div className = "title">Quizz (Get {this.state.level} correct answers for the next level)</div>}
                
 

                {this.state.questionBank.length > 0 && 
                this.state.responses < 5 &&
                this.state.questionBank.map(({question, answers, correct, questionId}) =>(
                    <QuestionBox
                    question={question}
                    options={answers}
                    key={questionId}
                    selected={answer => this.computeAnswer(answer, correct)}
                    />
                )
                )}

                {this.state.responses === 5 && 
                this.state.score < this.state.level &&
                this.state.level < 5 ? (
                <Result score={this.state.score}
                 playAgain={this.playAgain}/>
                 ): null}

                {this.state.responses === 5 && 
                this.state.score >= this.state.level &&
                this.state.level < 5 ? (
                <NextLvl score={this.state.score}
                 nextLvl={this.nextLvl}/>
                 ): null}

                {this.state.responses === 5 && 
                this.state.responses >= this.state.level &&
                this.state.level === 5 ? (
                <Won score={this.state.score}
                 playAgain={this.playAgain}/>
                 ):null}

            </div>
        );
    }
}

ReactDOM.render(<Quizz/>, document.getElementById("root"));