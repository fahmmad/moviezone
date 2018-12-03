import React from 'react';
import ReactDOM from 'react-dom';
import Filter from "./Filter";
import Slider from 'rc-slider';

var createComponent = require('react-unit');

const options = [ {value: 28, label: "Action"},
                    {value: 12, label: "Adventure"},
                    {value: 16, label: "Animation"},
                    {value: 35, label: "Comedy"},
                    {value: 80, label: "Crime"},
                    {value: 99, label: "Documentary"},
                    {value: 18, label: "Drama"},
                    {value: 10751, label: "Family"},
                    {value: 14, label: "Fantasy"},
                    {value: 36, label: "History"},
                    {value: 27, label: "Horror"},
                    {value: 10402, label: "Music"},
                    {value: 9648, label: "Mystery"},
                    {value: 10749, label: "Romance"},
                    {value: 878, label: "Science Fiction"},
                    {value: 10770, label: "TV Movie"},
                    {value: 53, label: "Thriller"},
                    {value: 10752, label: "War"},
                    {value: 37, label: "Western"}
                ]

describe('Filter', () => {
    it('MultiSelect should echo the value', () => {
      var component = createComponent(<Filter 
                                            selected={[]} 
                                            options={options} 
                                            rating={5}
                                            onChangeGenre={ (entry) => console.log(entry) } 
                                            onChangeRating={(entry) => console.log(entry)} 
                                        />);
  
      var span = component.findByQuery('span')[0];
  
      expect(span.text).toBe("Select Genres");
    });
  
    it('MultiSelect should trigger onChange event', () => {
      var changedValue;
      function onChange(e) { changedValue = e; }
      var component = createComponent.shallow(<Filter 
                                                selected={[]} 
                                                options={options} 
                                                rating={5}
                                                onChangeGenre={ onChange } 
                                                onChangeRating={onChange} 
                                            />);

        var multiSelect = component.findByQuery('ReactMultiselectCheckboxes')[0];
        multiSelect.onChange( {value: 16, label: "Animation"} );
  
        expect(changedValue.value).toBe(16) && expect(changedValue.label).toBe('Animation');
    });
    
    it('Slider should trigger onChange event', () => {
        var changedValue;
        function onChange(e) { changedValue = e.rating; }
        var component = createComponent.shallow(<Filter 
                                                  selected={[]} 
                                                  options={options} 
                                                  rating={5}
                                                  onChangeGenre={ onChange } 
                                                  onChangeRating={onChange} 
                                              />);
        var slider = component.findByComponent(Slider)[0];
        slider.onChange( 7 );
        expect(changedValue).toBe(7);
      });
  });