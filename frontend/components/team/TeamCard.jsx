import React from 'react';

function TeamCard({ imgUrl, userName, githubLink }) {
    const styles = {
        card: {
            width: '200px',
            height: '300px',
            border: '2px solid #ccc',
            padding: '10px',
            textAlign: 'center',
            borderRadius: '8px',
        },
        img: {
            width: '100%',
            height: '60%',
            objectFit: 'cover',
            borderRadius: '4px',
        },
        name: {
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '10px 0',
        },
        link: {
            textDecoration: 'none',
            color: '#007bff',
        }
    };

    return (
        <div style={styles.card}>
            {/* Image */}
            <img 
                style={styles.img} 
                src={imgUrl || "https://avatars.githubusercontent.com/u/26?v=4"} 
                alt={`${userName || 'User'}'s team`} 
            />

            {/* Username */}
            <h3 style={styles.name}>{userName || "Austin"}</h3>

            {/* GitHub Link */}
            <p>
                <a href={githubLink} style={styles.link} target="_blank" rel="noopener noreferrer">
                    GitHub Link
                </a>
            </p>
        </div>
    );
}

export default TeamCard;
