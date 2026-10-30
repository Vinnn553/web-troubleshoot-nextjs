// app/actions.js
'use server';
import pool from "@/lib/db"; // Atau sesuaikan dengan konfigurasi koneksi pool Anda

export async function searchItem(query) {
    try {
        if (!query || !query.trim()) {
            const data = await pool.query(`SELECT * FROM "tutorialList" ORDER BY title ASC`);
            return data.rows;
        }
        const formattedQuery = query.trim().split(/\s+/).join(' & ') + ':*';
        const data = await pool.query(`SELECT * FROM "tutorialList" WHERE to_tsvector('indonesian', title) @@ to_tsquery('indonesian', $1) ORDER BY title ASC`, [formattedQuery]);
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Gagal melakukan pencarian.');
    }
}