import { faker, Faker } from "@faker-js/faker"

export type Teacher = {
    name: string;
    birthDay: string;
    gender: string;
    phoneNumber: string;
    email: string;
    address: string;
}

function generatePhoneNumber(): string {
  let phone = "0";
  for (let i = 0; i < 9; i++) {
    phone += Math.floor(Math.random() * 10);
  }
  return phone;
}

const createTeacher = (numTeacher:number) =>
{
    const teachers: Teacher[] =[]
    const genders = ["Nam", "Nữ"]
    for(let i = 0;i<numTeacher;i++)
    {
        teachers.push({
            name:faker.person.fullName(),
            birthDay:faker.date.birthdate().toDateString(),
            gender:genders[Math.floor(Math.random() * genders.length)],
            phoneNumber:faker.phone.number(),
            email:faker.internet.email(),
            address: faker.location.streetAddress() + ", " + faker.location.city()+ ", " +faker.location.state() 
        })
    }
    return teachers
}

export const dataTeacher: Teacher[] = [...createTeacher(100)]