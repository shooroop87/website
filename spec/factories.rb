FactoryGirl.define do

  factory :due do # lol due do.
    amount { rand(1..100) }
    member
  end

  factory :event do
    title { Faker::Lorem.sentence(3, false, 2).chomp('.') }
    description { Faker::Lorem.paragraphs(2).join("\n") }
    start_time { Random.rand(2.years).from_now - 1.year }
    end_time { |e| e.start_time + Random.rand(24).hours }
    location { Faker::Address.street_address }

    factory :talk, :class => Talk do
      talker { Faker::Name.name }
    end
  end

  factory :key

  factory :member do
    name { Faker::Name.name }
    email { Faker::Internet.email }

    factory :secure_member, :class => SecureMember do
      password { Faker::Internet.email }
      password_confirmation { |m| m.password }

      factory :officer, :class => Officer do
        after(:create) do |officer, evaluator|
          officer.positions << create(:position)
        end
      end
    end
  end

  factory :position do
    title { Faker::Name.title }
  end

  factory :post do
    title { Faker::Lorem.sentence(3, false, 2).chomp('.') }
    body { Faker::Lorem.paragraphs(10).join("\n\n") }
    member { create(:officer) }
  end

  factory :tag do
    name { Faker::Commerce.department }
  end

  factory :tagging do
    tag
    taggable { create([:event, :post].sample) }
  end

end
