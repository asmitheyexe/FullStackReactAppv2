import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    CreateItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 0
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error, called, data }) => (
          <Form
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <Error error={error}></Error>
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor='title'>
                Title
                <input
                  type='text'
                  id='title'
                  name='title'
                  placeholder='Title'
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor='price'>
                Title
                <input
                  type='number'
                  id='price'
                  name='price'
                  placeholder='$0'
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor='description'>
                Title
                <textarea
                  id='description'
                  name='description'
                  placeholder='Enter a Description'
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <button>Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}
export default CreateItem;
export { CREATE_ITEM_MUTATION };
