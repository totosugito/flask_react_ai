

def smart_data_frame_to_json(df_):
    result = []
    i_row = 0
    for row in df_.index:
        row_ = df_.iloc[i_row]

        i_col = 0
        full_row = {'Index': row}
        for col in df_.columns:
            full_row[col] = row_[i_col]
            i_col = i_col + 1

        result.append(full_row)
        i_row = i_row + 1

    return result
