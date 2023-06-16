import {Divider, Typography} from 'antd';

const {Title, Paragraph, Text, Link} = Typography;
const blockContent = `AntV 是蚂蚁集团全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、不限可能的数据可视化最佳实践。得益于丰富的业务场景和用户需求挑战，AntV 经历多年积累与不断打磨，已支撑整个阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验。
我们正在基础图表，图分析，图编辑，地理空间可视化，智能可视化等各个可视化的领域耕耘，欢迎同路人一起前行。`;
const App = () => (
    <div className='track-overview'>
        <Typography style={{padding: '8px 40px'}}>
            {/*<Title level={3}>Sakhir</Title>*/}
            <Title level={4}>When was the track built?</Title>
            <Paragraph>
                Ground was broken for the Bahrain International Circuit in December 2002. Like the Yas Marina Circuit in
                Abu Dhabi, the developers had a blank, sandy canvas to work with, and with that fashioned the technical,
                5.4km track designed by Hermann Tilke.
            </Paragraph>
            <Title level={4}>When was its first Grand Prix?</Title>
            <Paragraph>
                It was 2004 when the drivers first lined up under an unusually cloudy sky for the inaugural Bahrain
                Grand Prix. The race was dominated (like many in 2004) by the two Ferraris, with Michael Schumacher
                winning out from Rubens Barrichello, while the crowds were also treated to a fantastic dog-fight between
                the Jaguar of Mark Webber and the Renault of Fernando Alonso.
            </Paragraph>
            <Title level={4}>What’s the circuit like?</Title>
            <Paragraph>
                You can usually expect great racing and decent amounts of overtaking in Bahrain, while the drivers have
                to contend with wind, racing under floodlights and the difficulty of finding a decent set-up with the
                wide temperature fluctuations between sessions. The track’s most challenging point is the tight,
                downhill, off-camber Turn 10 left-hander, while the fast run through Turn 12 is another highlight,
                allowing the racers to really feel their cars coming alive.
            </Paragraph>
        </Typography>
    </div>

);
export default App;
