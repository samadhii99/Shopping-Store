import React from "react";
import { Row, Col, Typography, Card, Divider } from "antd";
import {
  TeamOutlined,
  HistoryOutlined,
  StarOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface AboutUsPageProps {
  isDarkMode: boolean;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: "Jane Smith",
      position: t("about.our_team.ceo"),
      image: "/images/products/p1.jpg",
      bio: t("about.our_team.jane_bio"),
    },
    {
      name: "John Davis",
      position: t("about.our_team.cto"),
      image: "/images/products/p2.jpg",
      bio: t("about.our_team.john_bio"),
    },
    {
      name: "Sarah Chen",
      position: t("about.our_team.cdo"),
      image: "/images/products/p3.jpg",
      bio: t("about.our_team.sarah_bio"),
    },
  ];

  return (
    <div
      className={`container mx-auto px-4 py-12 mt-16 ${
        isDarkMode ? "text-dark-text" : "text-primary-900"
      }`}
    >
      {/* Hero Section */}
      <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden mb-12">
        <img
          src="/images/products/hero.jpg"
          alt="About Timeless Store"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <Typography.Title
            level={1}
            className={`text-white text-5xl font-bold`}
          >
            {t("about.title", "About Timeless Store")}
          </Typography.Title>
        </div>
      </div>

      {/* Our Story Section */}
      <Row gutter={[32, 32]} className="mb-16">
        <Col xs={24} md={12}>
          <Typography.Title
            level={2}
            className={`${
              isDarkMode ? "text-dark-primary-700" : "text-primary-700"
            } flex items-center`}
          >
            <HistoryOutlined className="mr-2" />{" "}
            {t("about.our_story.title", "Our Story")}
          </Typography.Title>
          <Typography.Paragraph
            className={`${
              isDarkMode ? "text-dark-primary-600" : "text-primary-600"
            } text-lg`}
          >
            {t(
              "about.our_story.paragraph1",
              "Founded in 2018, Timeless Store began with a simple vision: to create a fashion marketplace that focuses on quality, sustainability, and timeless design. What started as a small boutique in Colombo has grown into Sri Lanka's leading online fashion destination."
            )}
          </Typography.Paragraph>
          <Typography.Paragraph
            className={`${
              isDarkMode ? "text-dark-primary-600" : "text-primary-600"
            } text-lg`}
          >
            {t(
              "about.our_story.paragraph2",
              "Our journey is rooted in the belief that fashion should be accessible, ethical, and long-lasting. We partner with both established and emerging designers who share our values, bringing you carefully curated collections that stand the test of time."
            )}
          </Typography.Paragraph>
        </Col>
        <Col xs={24} md={12}>
          <div className="h-full flex items-center justify-center">
            <img
              src="/images/products/story.webp"
              alt="Our Story"
              className="rounded-lg shadow-lg max-h-[400px] object-cover"
            />
          </div>
        </Col>
      </Row>

      {/* Our Mission Section */}
      <Row gutter={[32, 32]} className="mb-16">
        <Col xs={24} md={{ span: 12, order: 2 }}>
          <Typography.Title
            level={2}
            className={`${
              isDarkMode ? "text-dark-primary-700" : "text-primary-700"
            } flex items-center`}
          >
            <StarOutlined className="mr-2" />{" "}
            {t("about.our_mission.title", "Our Mission")}
          </Typography.Title>
          <Typography.Paragraph
            className={`${
              isDarkMode ? "text-dark-primary-600" : "text-primary-600"
            } text-lg`}
          >
            {t(
              "about.our_mission.paragraph1",
              "At Timeless Store, our mission is to redefine fashion retail in Sri Lanka by offering high-quality, sustainable products that inspire confidence and self-expression. We aim to build lasting relationships with our customers through exceptional service and a personalized shopping experience."
            )}
          </Typography.Paragraph>
          <Typography.Paragraph
            className={`${
              isDarkMode ? "text-dark-primary-600" : "text-primary-600"
            } text-lg`}
          >
            {t(
              "about.our_mission.paragraph2",
              "We're committed to ethical practices throughout our supply chain, working only with partners who provide fair wages and safe working conditions. By 2025, we aim to have 80% of our products made from sustainable materials and reduce our carbon footprint by 50%."
            )}
          </Typography.Paragraph>
        </Col>
        <Col xs={24} md={{ span: 12, order: 1 }}>
          <div className="h-full flex items-center justify-center">
            <img
              src="/images/products/mission.jpg"
              alt="Our Mission"
              className="rounded-lg shadow-lg max-h-[400px] object-cover"
            />
          </div>
        </Col>
      </Row>

      {/* Our Values Section */}
      <div className="mb-16">
        <Typography.Title
          level={2}
          className={`${
            isDarkMode ? "text-dark-primary-700" : "text-primary-700"
          } text-center mb-8 flex items-center justify-center`}
        >
          <GlobalOutlined className="mr-2" />{" "}
          {t("about.our_values.title", "Our Values")}
        </Typography.Title>

        <Row gutter={[24, 24]} justify="center">
          {[
            {
              title: t("about.our_values.quality.title", "Quality"),
              description: t(
                "about.our_values.quality.description",
                "We source the best materials and work with skilled artisans to ensure every product meets our high standards."
              ),
              icon: "🌟",
            },
            {
              title: t(
                "about.our_values.sustainability.title",
                "Sustainability"
              ),
              description: t(
                "about.our_values.sustainability.description",
                "We're committed to reducing our environmental impact through eco-friendly materials and practices."
              ),
              icon: "🌱",
            },
            {
              title: t("about.our_values.innovation.title", "Innovation"),
              description: t(
                "about.our_values.innovation.description",
                "We continuously explore new technologies and approaches to improve our products and customer experience."
              ),
              icon: "💡",
            },
            {
              title: t("about.our_values.community.title", "Community"),
              description: t(
                "about.our_values.community.description",
                "We invest in local communities through employment opportunities and social initiatives."
              ),
              icon: "🤝",
            },
          ].map((value, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card
                className={`h-full text-center ${
                  isDarkMode
                    ? "bg-dark-primary-100 border-dark-primary-200"
                    : "bg-white border-primary-200"
                }`}
                bordered
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <Typography.Title
                  level={4}
                  className={`${
                    isDarkMode ? "text-dark-primary-700" : "text-primary-700"
                  }`}
                >
                  {value.title}
                </Typography.Title>
                <Typography.Paragraph
                  className={`${
                    isDarkMode ? "text-dark-primary-600" : "text-primary-600"
                  }`}
                >
                  {value.description}
                </Typography.Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Our Team Section */}
      <div className="mb-16">
        <Typography.Title
          level={2}
          className={`${
            isDarkMode ? "text-dark-primary-700" : "text-primary-700"
          } text-center mb-8 flex items-center justify-center`}
        >
          <TeamOutlined className="mr-2" />{" "}
          {t("about.our_team.title", "Our Team")}
        </Typography.Title>

        <Row gutter={[24, 24]}>
          {teamMembers.map((member, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                className={`h-full ${
                  isDarkMode
                    ? "bg-dark-primary-100 border-dark-primary-200"
                    : "bg-white border-primary-200"
                }`}
                cover={
                  <img
                    alt={member.name}
                    src={member.image}
                    className="h-64 object-cover object-center"
                  />
                }
              >
                <Typography.Title
                  level={4}
                  className={`${
                    isDarkMode ? "text-dark-primary-700" : "text-primary-700"
                  } mb-1`}
                >
                  {member.name}
                </Typography.Title>
                <Typography.Text
                  className={`block mb-4 ${
                    isDarkMode ? "text-dark-primary-500" : "text-primary-500"
                  } font-medium`}
                >
                  {member.position}
                </Typography.Text>
                <Typography.Paragraph
                  className={`${
                    isDarkMode ? "text-dark-primary-600" : "text-primary-600"
                  }`}
                >
                  {member.bio}
                </Typography.Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Divider
        className={`${
          isDarkMode ? "border-dark-primary-200" : "border-primary-200"
        }`}
      />

      {/* Milestones Section */}
      <div>
        <Typography.Title
          level={2}
          className={`${
            isDarkMode ? "text-dark-primary-700" : "text-primary-700"
          } text-center mb-8`}
        >
          {t("about.milestones.title", "Our Journey")}
        </Typography.Title>

        <div className="relative">
          {/* Timeline line */}
          <div
            className={`absolute left-0 md:left-1/2 h-full w-0.5 transform -translate-x-1/2 ${
              isDarkMode ? "bg-dark-primary-400" : "bg-primary-400"
            }`}
          />

          {/* Timeline items */}
          {[
            {
              year: "2018",
              title: t("about.milestones.2018.title", "Our Beginning"),
              description: t(
                "about.milestones.2018.description",
                "Opened our first boutique store in Colombo with a small collection of local designers."
              ),
            },
            {
              year: "2020",
              title: t("about.milestones.2020.title", "Online Launch"),
              description: t(
                "about.milestones.2020.description",
                "Launched our e-commerce platform during the pandemic, reaching customers across Sri Lanka."
              ),
            },
            {
              year: "2022",
              title: t("about.milestones.2022.title", "Expansion"),
              description: t(
                "about.milestones.2022.description",
                "Expanded our product range to include home decor and lifestyle products. Opened our second physical store."
              ),
            },
            {
              year: "2024",
              title: t("about.milestones.2024.title", "International Shipping"),
              description: t(
                "about.milestones.2024.description",
                "Started shipping internationally and introduced our first fully sustainable collection."
              ),
            },
          ].map((milestone, index) => (
            <div className="relative mb-12" key={index}>
              <div
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Year circle */}
                <div
                  className={`absolute left-0 md:left-1/2 w-7 h-7 rounded-full transform -translate-x-1/2 ${
                    isDarkMode ? "bg-dark-primary-500" : "bg-primary-500"
                  } flex items-center justify-center`}
                >
                  <div className={`w-3 h-3 rounded-full bg-white`} />
                </div>

                {/* Content */}
                <div
                  className={`ml-10 md:ml-0 md:w-5/12 ${
                    index % 2 === 0
                      ? "md:mr-auto md:pr-8"
                      : "md:ml-auto md:pl-8"
                  }`}
                >
                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode
                        ? "bg-dark-primary-100 border border-dark-primary-200"
                        : "bg-white border border-primary-200"
                    } shadow-sm`}
                  >
                    <Typography.Title
                      level={3}
                      className={`${
                        isDarkMode
                          ? "text-dark-primary-700"
                          : "text-primary-700"
                      } mb-0`}
                    >
                      {milestone.year}
                    </Typography.Title>
                    <Typography.Title
                      level={4}
                      className={`${
                        isDarkMode
                          ? "text-dark-primary-600"
                          : "text-primary-600"
                      } mt-1`}
                    >
                      {milestone.title}
                    </Typography.Title>
                    <Typography.Paragraph
                      className={`${
                        isDarkMode
                          ? "text-dark-primary-500"
                          : "text-primary-500"
                      } mb-0`}
                    >
                      {milestone.description}
                    </Typography.Paragraph>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
