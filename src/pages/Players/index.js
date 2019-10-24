import React from 'react';
import { Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';
import colors from '../../util/colors';

export const Players = () => {
  const onChange = () => {};
  return data.map(player => {
    return (
      <InfoCard className="category-details-information-card" width="auto">
        <CardTitle>{stndrdth(player.grade)} Grade</CardTitle>
        <Row>
          <Col md={6}>
            <Label>{player.team}</Label>
            <InfoText className="name">
              {player.firstname} {player.lastname}
            </InfoText>
            <ToggleButtonGroup type="checkbox" onChange={onChange}>
              <ToggleButton value={'a'}>a</ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
      </InfoCard>
    );
  });
};

export default Players;

function stndrdth(number) {
  const pr = new Intl.PluralRules('en-US', { type: 'ordinal' });
  const ordinals = {
    one: 'st',
    two: 'nd',
    few: 'rd',
    many: 'th',
    zero: 'th',
    other: 'th'
  };
  return `${number}${ordinals[pr.select(number)]}`;
}

export const InfoCard = styled.div`
  margin: 1em auto;
  background-color: ${colors.backgroundAlt};
  padding: 20px;
`;
InfoCard.displayName = 'InfoCard';
export const CardTitle = styled.h4`
  height: 14px;
  color: #626262;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
`;
CardTitle.displayName = 'CardTitle';
export const Label = styled(CardTitle)`
  height: 15px;
  font-weight: 300;
  line-height: 15px;
`;
Label.displayName = 'Label';
export const InfoText = styled(CardTitle)`
  color: #000000;
  font-size: 18px;
  line-height: 22px;
`;
InfoText.displayName = 'InfoText';

const data = [
  {
    lastname: 'Anderson',
    firstname: 'Clara',
    grade: 4,
    team: 'Black',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Anslinger',
    firstname: 'Addison',
    grade: 4,
    team: 'Black',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Archuleta',
    firstname: 'Sidney',
    grade: 4,
    team: 'Black',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'August',
    firstname: 'Ashlyn',
    grade: 4,
    team: 'Black',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Gernes',
    firstname: 'Abigail',
    grade: 4,
    team: 'Black',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Haugen',
    firstname: 'Sadie',
    grade: 4,
    team: 'Black',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Peterson',
    firstname: 'Lauren',
    grade: 4,
    team: 'Black',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Robinson',
    firstname: 'Eloise',
    grade: 4,
    team: 'Black',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Anderson',
    firstname: 'Kate',
    grade: 5,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Henderson',
    firstname: 'Coli',
    grade: 5,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Lahti',
    firstname: 'Macie',
    grade: 5,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'McQuillan',
    firstname: 'Kensley',
    grade: 5,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Namjoshi',
    firstname: 'Nesa',
    grade: 5,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Nieman',
    firstname: 'Greta',
    grade: 5,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Santy',
    firstname: 'Lauren',
    grade: 5,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Zaccardi-Ware',
    firstname: 'Cayden',
    grade: 5,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Boudreau',
    firstname: 'Eve',
    grade: 5,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Breidall',
    firstname: 'Maria',
    grade: 5,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Holloway',
    firstname: 'Maleah',
    grade: 5,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Kalar',
    firstname: 'Rowan',
    grade: 5,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Kaufman',
    firstname: 'Izzy',
    grade: 5,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Price',
    firstname: 'Taylor',
    grade: 5,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Schmid',
    firstname: 'Reagan',
    grade: 5,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Sohrabian-Johnson',
    firstname: 'Yurany',
    grade: 5,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Anseth',
    firstname: 'Grace',
    grade: 6,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Baune',
    firstname: 'Talia',
    grade: 6,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Fine',
    firstname: 'Addison',
    grade: 6,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Hooks',
    firstname: 'Jazmyn',
    grade: 6,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Johnson',
    firstname: 'Emerson',
    grade: 6,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Krueger',
    firstname: 'Addison',
    grade: 6,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Robinson',
    firstname: 'Avery',
    grade: 6,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Sullivan',
    firstname: 'Jayla',
    grade: 6,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Brazil',
    firstname: 'Ella',
    grade: 6,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Dvoracek',
    firstname: 'Addi',
    grade: 6,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Fine',
    firstname: 'Mackenzie',
    grade: 6,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Mengel',
    firstname: 'Morgan',
    grade: 6,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Metzger',
    firstname: 'Katie',
    grade: 6,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Smith',
    firstname: 'Kiley',
    grade: 6,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Wulf',
    firstname: 'Aubrey',
    grade: 6,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Zink',
    firstname: 'Brooklyn',
    grade: 6,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Deekollu',
    firstname: 'Rishitha Raj',
    grade: 6,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Erickson',
    firstname: 'Samantha',
    grade: 6,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Johnson',
    firstname: 'Kady',
    grade: 6,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'McGee',
    firstname: 'Maggie',
    grade: 6,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Moorjani',
    firstname: 'Hannah',
    grade: 6,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Sauro',
    firstname: 'Audrey',
    grade: 6,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Sauro',
    firstname: 'Paityn',
    grade: 6,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Tammineedi',
    firstname: 'Harshini',
    grade: 6,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Archuleta',
    firstname: 'Carli',
    grade: 7,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Ash-Johnson',
    firstname: 'Sofia',
    grade: 7,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Dennin',
    firstname: 'Camryn',
    grade: 7,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Ehrman',
    firstname: 'Rae',
    grade: 7,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Hardwick',
    firstname: 'Ella',
    grade: 7,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Jordan',
    firstname: 'Vanessa',
    grade: 7,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'McNeil',
    firstname: 'Mya',
    grade: 7,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Schlagel',
    firstname: 'Tori',
    grade: 7,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Valiton',
    firstname: 'Abby',
    grade: 7,
    team: 'A',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Balakrishna',
    firstname: 'Aish',
    grade: 7,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Baune',
    firstname: 'Jocelyn',
    grade: 7,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Gmitro',
    firstname: 'Kyra',
    grade: 7,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Hoffmann',
    firstname: 'Kara',
    grade: 7,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Johnson',
    firstname: 'Kendall',
    grade: 7,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Jones',
    firstname: 'Kamea',
    grade: 7,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Peyer',
    firstname: 'Sophia',
    grade: 7,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Tape',
    firstname: 'Brooke',
    grade: 7,
    team: 'B',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Anderson',
    firstname: 'Genevieve',
    grade: 7,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Edwards',
    firstname: 'Gabby',
    grade: 7,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Gaffin',
    firstname: 'Audrey',
    grade: 7,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Lubin',
    firstname: 'Olivia',
    grade: 7,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Nelson',
    firstname: 'Mia',
    grade: 7,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Nelson',
    firstname: 'Sydney',
    grade: 7,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Troske',
    firstname: 'Katie',
    grade: 7,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Van Slyke',
    firstname: 'Michela',
    grade: 7,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Walvatne',
    firstname: 'Elzeda',
    grade: 7,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Bengtson',
    firstname: 'Livia',
    grade: 8,
    team: 'AB',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Brazil',
    firstname: 'Rylee',
    grade: 8,
    team: 'AB',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Decowski',
    firstname: 'Jessica',
    grade: 8,
    team: 'AB',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Gendler',
    firstname: 'Rebekah',
    grade: 8,
    team: 'AB',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Kotschevar',
    firstname: 'Kaci',
    grade: 8,
    team: 'AB',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Landwehr',
    firstname: 'Nora',
    grade: 8,
    team: 'AB',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'McNulty',
    firstname: 'Isabel',
    grade: 8,
    team: 'AB',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Pitzl',
    firstname: 'Hailee',
    grade: 8,
    team: 'AB',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Rice',
    firstname: 'Lauren',
    grade: 8,
    team: 'AB',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Atkinson',
    firstname: 'Sydney',
    grade: 8,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Fornetti',
    firstname: 'Livia',
    grade: 8,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Jackson',
    firstname: 'ShaiAnne',
    grade: 8,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Karthic',
    firstname: 'Kanya',
    grade: 8,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Keogh',
    firstname: 'Zofia',
    grade: 8,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Klammer',
    firstname: 'Tess',
    grade: 8,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Rupp',
    firstname: 'Elisabeth',
    grade: 8,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    lastname: 'Ryan',
    firstname: 'Zoe',
    grade: 8,
    team: 'C',
    checkedin: false,
    belongto: 'TRAVEL'
  }
];
