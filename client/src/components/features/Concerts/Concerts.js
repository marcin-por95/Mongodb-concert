import Concert from './../Concert/Concert';

const Concerts = ({ concerts }) => {

    return (
        <section>
            {concerts.map(con => <Concert key={con._id}  {...con} />)}
        </section>
    );
}

export default Concerts;