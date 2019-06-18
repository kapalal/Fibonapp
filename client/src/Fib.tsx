import React, { Component, FormEvent } from "react";
import axios from "axios";

interface State {
  seenIndexes: Array<{ number: number }>;
  values: {
    [index: string]: number;
  };
  index: string;
}
class Fib extends Component<{}, State> {
  public state: State = {
    seenIndexes: [],
    values: {},
    index: ""
  };

  public componentDidMount = () => {
    this.fetchValues();
    this.fetchIndexes();
  };

  public render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            type="number"
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  };

  private fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    this.setState({ values: values.data });
  };

  private fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    this.setState({
      seenIndexes: seenIndexes.data
    });
  };

  private handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await axios.post("/api/values", {
      index: this.state.index
    });
    this.setState({ index: "" });
  };

  private renderSeenIndexes = () => {
    return this.state.seenIndexes.map(({ number }) => number).join(", ");
  };

  private renderValues = () => {
    const entries = [];
    for (const key of Object.keys(this.state.values)) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  };
}

export default Fib;
